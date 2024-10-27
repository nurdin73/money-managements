<?php

namespace App\Repositories\Master;

use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use App\Repositories\Master\RoleRepository;
use App\Models\Master\Role;
use App\Criteria\DefaultRequestCriteriaCriteria;

/**
 * Class RoleRepositoryEloquent.
 *
 * @package namespace App\Repositories\Master;
 */
class RoleRepositoryEloquent extends BaseRepository implements RoleRepository
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return Role::class;
    }



    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(DefaultRequestCriteriaCriteria::class));
    }
}
