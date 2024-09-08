<?php

namespace App\Http\Controllers\Master;

use App\Http\Controllers\Controller;
use App\Repositories\Master\UserRepository;
use App\Http\Requests\Master\UserRequest;
use App\Http\Resources\Master\UserResource;
use Illuminate\Http\Request;
use App\Exports\Master\UserExport;
use Illuminate\Support\Facades\Storage;

/**
 * Class UserRepositoryEloquent.
 *
 * @package namespace App\Http\Controllers\Master;
 */
class UserController extends Controller
{
    protected UserRepository $repository;

    public function __construct(UserRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $results = $this->repository->paginate($this->limit());
        return $this->sendResponse(trans('messages.list', ['attr' => 'User']), UserResource::collection($results), true);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(UserRequest $request)
    {
        $payload = $request->validated();
        $this->repository->create($payload);
        return $this->sendResponse(trans('messages.create', ['attr' => "User"]));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $find = $this->repository->find($id);
        return $this->sendResponse(trans('messages.list', ['attr' => "User"]), new UserResource($find));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UserRequest $request, string $id)
    {
        $data = $request->validated();
        $find = $this->repository->find($id);
        $find->update($data);
        return $this->sendResponse(trans('messages.update', ['attr' => "User"]), new UserResource($find));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $find = $this->repository->find($id);
        $find->delete();
        return $this->sendResponse(trans('messages.destroy', ['attr' => "User"]), new UserResource($find));
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
        return $this->sendResponse(trans('messages.destroy', ['attr' => "{{ modelName }}"]));
    }

    /**
     * export resource from database.
     */
    public function exports()
    {
        $results = $this->repository->get();
        $export = new UserExport($results);
        $path = 'exports/users.xlsx';
        $export->store($path, 'local', \Maatwebsite\Excel\Excel::XLSX);
        $pathFile = Storage::disk('local')->path($path);
        $content = file_get_contents($pathFile);
        $base64 = base64_encode($content);
        $mime_type = mime_content_type($pathFile);
        Storage::disk('local')->delete($path);
        return $this->sendResponse(trans('messages.export'), [
            'mime_type' => $mime_type,
            'base64' => $base64,
            'file_name' => 'users.xlsx'
        ]);
    }
}
