<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\ResendVerifyRequest;
use App\Services\Authentication;
use Illuminate\Http\Request;

class ResentVerifyController extends Authentication
{
    public function __invoke(ResendVerifyRequest $request)
    {
        $payload = $request->validated();
        $this->resentVerificationCode($payload);
        return $this->sendResponse(trans('passwords.sent'));
    }
}
