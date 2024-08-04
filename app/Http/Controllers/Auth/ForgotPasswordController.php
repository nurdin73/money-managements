<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\ForgotPasswordRequest;
use App\Services\Authentication;
use Illuminate\Http\Request;

class ForgotPasswordController extends Authentication
{
    public function __invoke(ForgotPasswordRequest $request)
    {
        $payload = $request->validated();
        $key = $this->forgotPassword($payload);
        return $this->sendResponse(trans('passwords.sent'), [
            'key' => $key
        ]);
    }
}
