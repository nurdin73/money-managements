<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Services\Authentication;
use Illuminate\Http\Request;

class ProfileController extends Authentication
{
    public function index()
    {
        return auth()->user();
    }

    public function changeProfile(Request $request)
    {
        $payload = $this->validate($request, [
            'name' => 'required|string',
        ]);

        $user = $this->updateAccount($payload, auth()->id());

        return $this->sendResponse("Update Profile Successfully");
    }

    public function changeAvatar(Request $request)
    {
        $this->validate($request, [
            'avatar' => 'required|file|mimes:png,jpg'
        ]);
        $this->updateAvatar(auth()->id(), $request->file('avatar'));

        return $this->sendResponse("Change My Avatar Successfully");
    }

    public function changePassword(Request $request)
    {
        $data = $this->validate($request, [
            'old_password' => 'required',
            'password' => 'required|min:8|confirmed|regex:/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/'
        ]);
        $this->validOldPassword($data['old_password']);
        $this->changePasswordAccount($data, auth()->id());
        return $this->sendResponse("Change Password Successfully");
    }
}
