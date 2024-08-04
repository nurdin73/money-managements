<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Services\Authentication;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class LoginController extends Authentication
{
    public function __invoke(LoginRequest $request)
    {
        $attr = $request->validated();
        $user = $this->checkEmailIsExist($attr['email']);
        if (!$user) return $this->sendError(trans('auth.failed'));
        if (!$user->hasVerifiedEmail()) return $this->sendError(trans('auth.not-verified'));
        if (!$this->checkPasswordIsValid($user, $attr['password'])) return $this->sendError(trans('auth.failed'));

        if (!$user->password_expired) {
            $user->password_expired = Carbon::now()->addMonths(config('app.app_password_expired'))->endOfDay();
            $user->save();
        }

        $checkPasswordExpired = Carbon::now()->diffInDays($user->password_expired);
        if ($checkPasswordExpired <= 0) {
            $token = encrypt($user->id);
            Cache::put("reset-token-{$token}", $token, Carbon::now()->addMinutes(config('auth.passwords.users.expire')));
            return $this->sendResponse("Kata sandi sudah kadaluarsa. Silahkan ubah kata sandi anda", [
                'password_expired' => true,
                'token' => $token
            ]);
        }

        if (config('otp.enabled')) {
            $key = $this->createOtp($user, null, 'login', $attr);

            return $this->sendResponse("Send OTP Successfully", [
                'password_expired' => false,
                'key' => $key
            ]);
        }

        $token = $user->createToken('users')->plainTextToken;

        return $this->sendResponse("Login success", [
            'access_token' => $token,
        ]);
    }
}
