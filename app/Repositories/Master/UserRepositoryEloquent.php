<?php

namespace App\Repositories\Master;

use App\Criteria\DefaultRequestCriteriaCriteria;
use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use App\Repositories\Master\UserRepository;
use App\Models\Master\User;

/**
 * Class UserRepositoryEloquent.
 *
 * @package namespace App\Repositories\Master;
 */
class UserRepositoryEloquent extends BaseRepository implements UserRepository
{
    // protected $fieldSearchable = [
    //     'name' => 'ilike',
    //     'email' => 'ilike'
    // ];
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return User::class;
    }



    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(DefaultRequestCriteriaCriteria::class));
    }
}