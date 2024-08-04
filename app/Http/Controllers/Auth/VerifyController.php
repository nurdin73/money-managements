<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\VerifyRequest;
use App\Services\Authentication;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class VerifyController extends Authentication
{
    public function __invoke(VerifyRequest $request)
    {
        $payload = $request->validated();
        if ($payload['type'] == 'register') {
            $this->verifyEmail($payload);
            return $this->sendResponse(trans('auth.success-verified'));
        }
        if ($payload['type'] == 'login') {
            $cred = $this->verifyOtp($payload);
            unset($cred['otp']);
            unset($cred['expired']);
            $user = $this->checkEmailIsExist($cred['email']);
            Cache::delete($payload['key']);
            Cache::delete("cred-user-{$user->email}");
            // AuthenticationLog::create([
            //     'user_id' => $user->id,
            //     'user_agent' => request()->userAgent(),
            // ]);
            $token = $user->createToken('users');
            return $this->sendResponse("Login Successfully", [
                'access_token' => $token->plainTextToken,
                'token_id' => $token->accessToken->id,
                'expires_at' => $token->accessToken->expires_at
            ]);
        }
        if ($payload['type'] == 'forgot-password') {
            $cred = $this->verifyOtp($payload);
            $token = encrypt($cred['user_id']);
            Cache::put("reset-token-{$token}", $token, Carbon::now()->addMinutes(config('auth.passwords.users.expire')));
            return $this->sendResponse("Otp valid", [
                'token' => $token
            ]);
        }
    }
}
