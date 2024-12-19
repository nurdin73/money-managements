<?php

namespace App\Http\Controllers\Transaction;

use App\Http\Controllers\Controller;
use App\Repositories\Transaction\IncomeExpenseRepository;
use App\Http\Requests\Transaction\IncomeExpenseRequest;
use App\Http\Resources\Transaction\IncomeExpenseResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
// export file content

/**
 * Class IncomeExpenseRepositoryEloquent.
 *
 * @package namespace App\Http\Controllers\Transaction;
 */
class IncomeExpenseController extends Controller
{
    protected IncomeExpenseRepository $repository;

    public function __construct(IncomeExpenseRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $req = $this->validate($request, [
            'type' => 'required|in:income,expense'
        ]);
        $this->repository->where('type', $req['type']);
        $results = $this->repository->with('category')->paginate($this->limit());
        return $this->sendResponse(trans('messages.list', ['attr' => 'IncomeExpense']), IncomeExpenseResource::collection($results), true);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(IncomeExpenseRequest $request)
    {
        $payload = $request->validated();
        $this->repository->create($payload);
        return $this->sendResponse(trans('messages.create', ['attr' => "IncomeExpense"]));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $find = $this->repository->find($id);
        return $this->sendResponse(trans('messages.list', ['attr' => "IncomeExpense"]), new IncomeExpenseResource($find));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(IncomeExpenseRequest $request, string $id)
    {
        $data = $request->validated();
        $find = $this->repository->find($id);
        $find->update($data);
        return $this->sendResponse(trans('messages.update', ['attr' => "IncomeExpense"]), new IncomeExpenseResource($find));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $find = $this->repository->find($id);
        $find->delete();
        return $this->sendResponse(trans('messages.destroy', ['attr' => "IncomeExpense"]), new IncomeExpenseResource($find));
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
        return $this->sendResponse(trans('messages.destroy', ['attr' => "IncomeExpense"]));
    }

    // export resources
}
