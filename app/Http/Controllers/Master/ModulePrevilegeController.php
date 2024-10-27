<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Repositories\Master\ModulePrevilegeRepository;
use App\Http\Requests\Master\ModulePrevilegeRequest;
use App\Http\Resources\Master\ModulePrevilegeResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
// export file content

/**
 * Class ModulePrevilegeRepositoryEloquent.
 *
 * @package namespace App\Http\Controllers\Master;
 */
class ModulePrevilegeController extends Controller
{
    protected ModulePrevilegeRepository $repository;

    public function __construct(ModulePrevilegeRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $results = $this->repository->paginate($this->limit());
        return $this->sendResponse(trans('messages.list', ['attr' => 'ModulePrevilege']), ModulePrevilegeResource::collection($results), true);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ModulePrevilegeRequest $request)
    {
        $payload = $request->validated();
        $this->repository->create($payload);
        return $this->sendResponse(trans('messages.create', ['attr' => "ModulePrevilege"]));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $find = $this->repository->find($id);
        return $this->sendResponse(trans('messages.list', ['attr' => "ModulePrevilege"]), new ModulePrevilegeResource($find));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ModulePrevilegeRequest $request, string $id)
    {
        $data = $request->validated();
        $find = $this->repository->find($id);
        $find->update($data);
        return $this->sendResponse(trans('messages.update', ['attr' => "ModulePrevilege"]), new ModulePrevilegeResource($find));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $find = $this->repository->find($id);
        $find->delete();
        return $this->sendResponse(trans('messages.destroy', ['attr' => "ModulePrevilege"]), new ModulePrevilegeResource($find));
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
        return $this->sendResponse(trans('messages.destroy', ['attr' => "ModulePrevilege"]));
    }

    // export resources
}
