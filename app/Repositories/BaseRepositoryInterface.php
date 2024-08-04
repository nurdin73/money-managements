<?php

namespace App\Repositories;

use Prettus\Repository\Contracts\RepositoryInterface;
use Prettus\Repository\Criteria\RequestCriteria;

interface BaseRepositoryInterface extends RepositoryInterface
{
  /**
   * push criteria for filter data
   *
   * @param RequestCriteria $requestCriteria
   * @return $this
   */
  function pushCriteria($requestCriteria);
}
