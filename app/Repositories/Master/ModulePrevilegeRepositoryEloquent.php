<?php

namespace App\Repositories\Master;

use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use App\Repositories\Master\ModulePrevilegeRepository;
use App\Models\Master\ModulePrevilege;
use App\Criteria\DefaultRequestCriteriaCriteria;

/**
 * Class ModulePrevilegeRepositoryEloquent.
 *
 * @package namespace App\Repositories\Master;
 */
class ModulePrevilegeRepositoryEloquent extends BaseRepository implements ModulePrevilegeRepository
{
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return ModulePrevilege::class;
    }



    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(DefaultRequestCriteriaCriteria::class));
    }
}
