<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\RegisterRequest;
use App\Repositories\Master\UserRepository;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;

class RegisterController extends Controller
{
    protected UserRepository $repository;

    public function __construct(UserRepository $repository)
    {
        $this->repository = $repository;
    }

    public function __invoke(RegisterRequest $request)
    {
        $payload = $request->validated();
        $payload['email_verified_at'] = now();
        $payload['password_expired'] = now()->addMonths(6);
        $user = $this->repository->create($payload);
        return $this->sendResponse("Register successfully", $user);
    }
}
