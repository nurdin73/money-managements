<?php

return [
  /**
   * OTP has enabled
   */
  'enabled' => env('OTP_ENABLED', true),
  /**
   * Length of OTP
   */
  'length' => env('OTP_LENGTH', 4),
  /**
   * Expired of OTP in minutes
   */
  'expire' => env('OTP_EXPIRE', 1)
];
