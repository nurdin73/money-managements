<?php

namespace App\Http\Middleware;

use App\Helpers\Recaptcha;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class Recapcha
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (config('recaptcha.captcha_enabled')) {
            $captcha = $request->header('x-captcha');
            if (!$captcha) abort(422, "Captcha Is Not Supplied!");
            $recaptcha = new Recaptcha();
            $checkCaptcha = $recaptcha->verify($captcha);
            if (!$checkCaptcha) abort(403, "Captcha Is Not Valid!");
        }
        return $next($request);
    }
}
