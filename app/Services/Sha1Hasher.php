<?php

namespace App\Services;

use Illuminate\Contracts\Hashing\Hasher as HasherContract;
use Illuminate\Hashing\AbstractHasher;

class Sha1Hasher extends AbstractHasher implements HasherContract
{

  /**
   * Hash the given value.
   *
   * @param  string $value
   * @param  array $options
   * @return string
   */
  public function make($value, array $options = [])
  {
    // return Hash::check($password, $user->password);
    $utf8String = mb_convert_encoding($value, 'UTF-8');
    $hashedBytes = sha1($utf8String, true);
    $bigInt = gmp_import($hashedBytes, 1, GMP_MSW_FIRST | GMP_BIG_ENDIAN);
    if (gmp_testbit($bigInt, 8 * strlen($hashedBytes) - 1)) {
      $bigInt = gmp_sub($bigInt, gmp_pow(2, 8 * strlen($hashedBytes)));
    }
    $encrypt = gmp_strval($bigInt, 16);
    return $encrypt;
  }

  /**
   * Check if the given hash has been hashed using the given options.
   *
   * @param  string $hashedValue
   * @param  array $options
   * @return bool
   */
  public function needsRehash($hashedValue, array $options = [])
  {
    return false;
  }

  /**
   * Check the given plain value against a hash.
   *
   * @param  string  $value
   * @param  string  $hashedValue
   * @param  array  $options
   * @return bool
   */
  public function check($value, $hashedValue, array $options = [])
  {
    return $this->make($value) === $hashedValue;
  }
}
