<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Repositories\Master\CategoryRepository;
use App\Http\Requests\Master\CategoryRequest;
use App\Http\Resources\Master\CategoryResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
// export file content

/**
 * Class CategoryRepositoryEloquent.
 *
 * @package namespace App\Http\Controllers\Master;
 */
class CategoryController extends Controller
{
    protected CategoryRepository $repository;

    public function __construct(CategoryRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $results = $this->repository->paginate($this->limit());
        return $this->sendResponse(trans('messages.list', ['attr' => 'Category']), CategoryResource::collection($results), true);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CategoryRequest $request)
    {
        $payload = $request->validated();
        $this->repository->create($payload);
        return $this->sendResponse(trans('messages.create', ['attr' => "Category"]));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $find = $this->repository->find($id);
        return $this->sendResponse(trans('messages.list', ['attr' => "Category"]), new CategoryResource($find));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CategoryRequest $request, string $id)
    {
        $data = $request->validated();
        $find = $this->repository->find($id);
        $find->update($data);
        return $this->sendResponse(trans('messages.update', ['attr' => "Category"]), new CategoryResource($find));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $find = $this->repository->find($id);
        $find->delete();
        return $this->sendResponse(trans('messages.destroy', ['attr' => "Category"]), new CategoryResource($find));
    }

    /**
     * Remove the bulk resource from storage.
     */
    public function bulkDestroy(Request $request)
    {
        $this->validate($request, [
            'ids' => 'required|array'
        ]);
        $ids = $request->ids;
        $find = $this->repository->whereIn('id', $ids)->delete();
        return $this->sendResponse(trans('messages.destroy', ['attr' => "Category"]));
    }

    // export resources
}
