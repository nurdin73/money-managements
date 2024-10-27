<?php

namespace App\Repositories\Master;

use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use App\Repositories\Master\ModuleRepository;
use App\Models\Master\Module;
use App\Criteria\DefaultRequestCriteriaCriteria;

/**
 * Class ModuleRepositoryEloquent.
 *
 * @package namespace App\Repositories\Master;
 */
class ModuleRepositoryEloquent extends BaseRepository implements ModuleRepository
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return Module::class;
    }



    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(DefaultRequestCriteriaCriteria::class));
    }
}
