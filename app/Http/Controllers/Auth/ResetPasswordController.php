<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\ResetPasswordRequest;
use App\Services\Authentication;
use Illuminate\Http\Request;

class ResetPasswordController extends Authentication
{
    public function __invoke(ResetPasswordRequest $request)
    {
        $payload = $request->validated();
        $this->resetPassword($payload);
        return $this->sendResponse("Reset Password Successfully");
    }
}
