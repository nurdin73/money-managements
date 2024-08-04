<?php

return [
  'captcha_enabled' => env('CAPTCHA_ENABLED', true),
  'url' => env('GOOGLE_URL_VERIFY_RECAPTCHA', 'https://www.google.com/recaptcha/api/siteverify'),
  'secret' => env('GOOGLE_RECAPTCHA_SECRET_KEY')
];
