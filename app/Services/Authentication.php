<?php

namespace App\Services;

use App\Helpers\GenerateAutoNumber;
use App\Helpers\UploadFile;
use App\Models\Master\User;
use Carbon\Carbon;
use Exception;
use Illuminate\Auth\Events\Verified;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Notification;
use Symfony\Component\Translation\Exception\NotFoundResourceException;
use Illuminate\Support\Str;
use App\Http\Controllers\Controller;
use App\Notifications\OtpNotification;
use Illuminate\Http\UploadedFile;

class Authentication
{
  public function model()
  {
    return User::query();
  }

  function checkEmailIsExist(String $email): bool|User
  {
    $check = $this->model()->where('email', $email)->first();
    if (!$check) return false;
    return $check;
  }

  function checkPasswordIsValid(User $user, String $password): bool
  {
    return Hash::check($password, $user->password);
  }

  /**
   * creating token authentication passport
   *
   * @param array $credentials
   * @param string $scope administrator and customer
   * @return boolean|array
   */
  function createToken(array $credentials): bool|array
  {
    if ($token = auth()->attempt($credentials)) {
      return [
        'access_token' => $token,
        'token_type' => 'bearer',
      ];
    }
    return false;
  }

  function register(array $payload): string
  {
    DB::beginTransaction();
    // $password = $payload['password'];
    try {
      $payload['password'] = Hash::make($payload['password']);
      $user = $this->createUser($payload);
      $key = $this->createOtp($user, null, 'register');
      DB::commit();
      // event(new Registered($user));
      return $key;
    } catch (Exception $th) {
      DB::rollBack();
      throw $th;
    }
  }

  function createOtp(User $user, ?string $key = null, ?string $type = 'otp', $cred = []): string
  {
    $otp = $this->generateOtp(config('otp.length'));
    $expire = $this->expiredOtp(config('otp.expire'));
    if (!$key) $key = Str::random(10);
    $payload = json_encode(['user_id' => $user->id, 'otp' => Hash::make($otp), 'expired' => $expire]);
    if ($type == 'login') {
      Cache::put("cred-user-{$cred['email']}", encrypt(json_encode($cred)));
      $payload = json_encode([...$cred, 'otp' => Hash::make($otp), 'expired' => $expire]);
    }
    $set = $this->storeOtp($key, $payload, config('otp.expire') * 60);
    $keyOtp = "otp-{$type}-$key";
    Cache::put($keyOtp, json_encode([
      Hash::make($user->email),
      $type
    ]), $expire);
    if (!$set) throw new Exception("Error create OTP", 500);
    Notification::send($user, new OtpNotification($otp, $key, $type));
    return $key;
  }

  function throttleOtp($key)
  {
    $totalThrottle = Cache::get("throttle-otp-{$key}") ?? 1;
    Cache::set("throttle-otp-{$key}", $totalThrottle + 1);
    if ($totalThrottle >= 3) {
      Cache::delete($key);
      Cache::delete("throttle-otp-{$key}");
      throw new Exception(trans('auth.otp-not-valid'));
    }
  }

  function verifyOtp($payload): array
  {
    $cred = json_decode($this->getOtp($payload['key']), true);
    if (!$cred) throw new Exception(trans('auth.otp-not-valid'));

    $keyOtp = "otp-{$payload['type']}-{$payload['key']}";
    $findKey = Cache::get($keyOtp);
    if (!$findKey) {
      throw new Exception(trans('auth.otp-not-valid'));
    }
    $findKey = json_decode($findKey, true);
    if ($findKey[1] !== $payload['type']) {
      $this->throttleOtp($payload['key']);
      throw new Exception(trans('auth.otp-not-valid'));
    }
    if (!Hash::check($payload['email'], $findKey[0])) {
      $this->throttleOtp($payload['key']);
      throw new Exception(trans('auth.otp-not-valid'));
    }
    if ($payload['type'] !== 'register') {
      if (!Hash::check($payload['email'], $findKey[0])) {
        $this->throttleOtp($payload['key']);
        throw new Exception(trans('auth.otp-not-valid'));
      }
    }
    if (!Hash::check($payload['otp'], $cred['otp'])) {
      $this->throttleOtp($payload['key']);
      throw new Exception(trans('auth.otp-not-valid'));
    }
    if (Carbon::now()->diffInSeconds($cred['expired']) <= 0) {
      $this->throttleOtp($payload['key']);
      throw new Exception(trans('auth.otp-not-valid'));
    }
    Cache::delete("otp-{$payload['type']}-{$payload['key']}");
    info($cred);
    return $cred;
  }


  function verifyEmail(array $payload): void
  {
    DB::beginTransaction();
    try {
      $cred = $this->verifyOtp($payload);
      $userId = $cred['user_id'];
      $findUser = $this->model()->find($userId);
      if (!$findUser) throw new NotFoundResourceException(trans('messages.not-found', ['attr' => 'Account']), 404);
      if (!$findUser->hasVerifiedEmail()) {
        $findUser->markEmailAsVerified();
        // $attach = new UploadFile();
        // $attach->createAvatar($findUser, $findUser->fullname);
        $autoNumber = new GenerateAutoNumber("CODE_USER", ":random");
        $autoNumber->setRandom(Str::upper(Str::random(6)));
        $code = $autoNumber->create();
        $findUser->password_expired = Carbon::now()->addMonths(config('app.app_password_expired'))->endOfDay();
        $findUser->code = $code;
        $findUser->save();
        event(new Verified($findUser));
        // $findUser->notify(new VerifiedEmailNotification($code));
        Cache::delete($payload['key']);
        DB::commit();
        return;
      }
      throw new Exception(trans('auth.verified'));
    } catch (\Throwable $th) {
      DB::rollBack();
      throw $th;
    }
  }

  function resentVerificationCode(array $payload): void
  {

    $findUser = $this->model()->where('email', $payload['email'])->first();
    if (!$findUser) return;
    $key = $payload['key'];
    $type = $payload['type'];
    $keyOtp = "otp-{$type}-{$key}";
    $findKey = Cache::get($keyOtp);
    if (!$findKey) throw new Exception("Failed resent OTP");
    $findKey = json_decode($findKey, true);
    info($findKey);
    if ($findKey[1] !== $type) throw new Exception("Failed resent OTP");
    if (!Hash::check($payload['email'], $findKey[0])) throw new Exception("Failed resent OTP");
    $cred = json_decode($this->getOtp($key), true);
    if (isset($cred)) {
      // if (Carbon::parse($cred['expired'])->getTimestamp() > Carbon::now()->getTimestamp()) throw new Exception("OTP has valid. please wait for resend!");
    }
    $credUser = Cache::get("cred-user-{$payload['email']}");
    if ($type == 'login') {
      $this->createOtp($findUser, $key, 'login', json_decode(decrypt($credUser), true));
      return;
    }
    // if (!isset($cred['user_id'])) throw new Exception("Key is not valid");
    // $user = $this->find($cred['user_id']);
    $this->createOtp($findUser, $key, $type);
    // if (!$findUser) throw new Exception("User not found", 404);
    // if ($findUser->hasVerifiedEmail()) throw new Exception("Email has verified!", 403);
    // $findUser->sendEmailVerificationNotification();
  }

  function forgotPassword(array $credentials): string
  {
    $findUser = $this->model()->where('email', $credentials['email'])->first();
    if (!$findUser) return Str::random(10);
    $key = $this->createOtp($findUser, null, 'forgot-password');
    return $key;
  }

  function resetPassword(array $payload): void
  {
    // $cred = json_decode(get_otp($payload['key']), true);
    // if (!$cred) throw new Exception("Key Not Valid");
    // if (!Hash::check($payload['verification_code'], $cred['otp'])) throw new Exception("OTP not correct!");
    // $userId = $cred['user_id'];
    $token = $payload['token'];
    $checkToken = Cache::get("reset-token-{$token}");
    if (!$checkToken) throw new Exception("Token is not validated!");
    $userId = decrypt($token);

    $findUser = $this->model()->find($userId);
    if (!$findUser) throw new Exception("Token Not Validated", 404);
    if (Hash::check($payload['password'], $findUser->password)) throw new Exception("Password tidak boleh sama seperti sebelumnya");
    $password = Hash::make($payload['password']);
    $findUser->password = $password;
    $findUser->password_expired = Carbon::now()->addMonths(config('app.app_password_expired'))->endOfDay();
    $findUser->save();
    Cache::delete("reset-token-{$token}");
  }

  function loginWithSSO(String $token): array
  {
    $send = Http::withHeaders([
      'Authorization' => "Bearer {$token}"
    ])->get(config('auth.sso_userinfo'));
    $response = $send->json();
    if (!$send->ok()) throw new Exception(trans('auth.failed'));
    $email = $response['email'] ?? Str::slug($response['name']);
    $user = $this->checkEmailIsExist($email);
    $uuid = Str::uuid()->toString();

    if (!$user) throw new NotFoundResourceException(trans('messages.not-found', ['attr' => 'Akun']));
    $user->password = Hash::make($uuid);
    $user->external_id = $response['sub'];
    $user->save();

    // AuthenticationLog::create([
    //     'user_id' => $user->id,
    //     'user_agent' => request()->userAgent(),
    // ]);

    return [
      'email' => $user->email,
      'password' => $uuid,
    ];

    // if (!$user) {
    //     $autoNumber = new GenerateAutoNumber("CODE_USER", ":random");
    //     $autoNumber->setRandom(Str::upper(Str::random(6)));
    //     $code = $autoNumber->create();
    //     $user = $this->create([
    //         'fullname' => $response['name'],
    //         'email' => $email,
    //         'email_verified_at' => now(),
    //         'is_active' => true,
    //         'external_id' => $response['sub'],
    //         'code' => $autoNumber->create(),
    //         'password' => Hash::make($uuid),
    //         'is_admin' => $scope == 'customer' ? false : ($scope == 'jury' ? false : true),
    //         'is_jury' => $scope == 'customer' ? false : ($scope == 'jury' ? true : false),
    //     ]);
    //     // if (isset($response['email'])) {
    //     //     $user->notify(new VerifiedEmailNotification($code));
    //     // }
    // }
    // $user->password = Hash::make($uuid);
    // $user->save();

    // // AuthenticationLog::create([
    // //     'user_id' => $user->id,
    // //     'user_agent' => request()->userAgent(),
    // // ]);

    // return [
    //     'email' => $user->email,
    //     'password' => $uuid,
    // ];
  }

  function blocked(array $payload)
  {
    // 
  }

  function updateAccount(array $payload, String|int $userId): User
  {
    $user = $this->model()->find($userId);
    $user->update($payload);
    // if (isset($payload['skills']) && count($payload['skills']) > 0) {
    //     BackgroundSkillUser::where('user_id', $userId)->delete();
    //     foreach ($payload['skills'] as $skill) {
    //         BackgroundSkillUser::create([
    //             'skill_id' => $skill,
    //             'user_id' => $userId
    //         ]);
    //     }
    // }
    // if (request()->hasFile('ktp')) {
    //     $file = request()->file('ktp');
    //     $upload = new UploadFile();
    //     $upload->bulkDestroyFile($user, 'identity-card');
    //     $upload->store($user, $file, 'users/identity-cards', [
    //         'tag' => 'identity-card'
    //     ]);
    // }
    return $user;
  }

  function updateAvatar(String|int $userId, UploadedFile $file): User
  {
    $path = "users/avatars";
    $user = $this->model()->find($userId);
    $upload = new UploadFile();
    $upload->bulkDestroyFile($user, 'avatar');
    $upload->store($user, $file, $path, [
      'tag' => 'avatar'
    ]);

    return $user;
  }

  function validOldPassword(string $oldPassword)
  {
    $user = $this->model()->find(auth()->id());
    if (!Hash::check($oldPassword, $user->password)) throw new Exception("Old Password not valid!");
  }

  function changePasswordAccount(array $payload, string|int $userId): User
  {
    $user = $this->model()->find($userId);
    if (Hash::check($payload['password'], $user->password)) throw new Exception("Password tidak boleh sama seperti sebelumnya");
    $payload['password'] = Hash::make($payload['password']);
    $payload['password_expired'] = Carbon::now()->addMonths(config('app.app_password_expired'))->endOfDay();
    $user->update($payload);
    return $user;
  }

  public function createUser($payload)
  {
    return $this->model()->create($payload);
  }

  function generateOtp(Int $length = 4): String
  {
    $prefix = '1234567890';
    $result = '';
    for ($i = 0; $i < $length; $i++) {
      $result .= $prefix[rand(0, strlen($prefix) - 1)];
    }
    return $result;
  }

  function expiredOtp(Int $minutes): String
  {
    $expired_at = Carbon::now()->addMinutes($minutes);
    return $expired_at;
  }

  function storeOtp(String $key, String $payload, String $expired_at): bool
  {
    $store = Cache::put($key, $payload, $expired_at);
    return $store;
  }

  function getOtp(String $key): mixed
  {
    $check = Cache::get($key);
    if (!$check) return false;
    return $check;
  }
}
