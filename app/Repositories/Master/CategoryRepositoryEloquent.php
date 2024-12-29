<?php

namespace App\Repositories\Master;

use Prettus\Repository\Eloquent\BaseRepository;
use Prettus\Repository\Criteria\RequestCriteria;
use App\Repositories\Master\CategoryRepository;
use App\Models\Master\Category;
use App\Criteria\DefaultRequestCriteriaCriteria;

/**
 * Class CategoryRepositoryEloquent.
 *
 * @package namespace App\Repositories\Master;
 */
class CategoryRepositoryEloquent extends BaseRepository implements CategoryRepository
{
    protected $fieldSearchable = [
        'name' => 'like',
        'is_active' => '='
    ];
    /**
     * Specify Model class name
     *
     * @return string
     */
    public function model()
    {
        return Category::class;
    }



    /**
     * Boot up the repository, pushing criteria
     */
    public function boot()
    {
        $this->pushCriteria(app(DefaultRequestCriteriaCriteria::class));
    }
}
