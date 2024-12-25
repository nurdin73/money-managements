<?php

namespace App\Http\Controllers\Transaction;

use App\ActionBudgetHistory;
use App\Http\Controllers\Controller;
use App\Repositories\Transaction\BudgetRepository;
use App\Http\Requests\Transaction\BudgetRequest;
use App\Http\Resources\Transaction\BudgetResource;
use App\Models\Transaction\BudgetHistory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
// export file content

/**
 * Class BudgetRepositoryEloquent.
 *
 * @package namespace App\Http\Controllers\Transaction;
 */
class BudgetController extends Controller
{
    protected BudgetRepository $repository;

    public function __construct(BudgetRepository $repository)
    {
        $this->repository = $repository;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $results = $this->repository->with(['category', 'expense'])->paginate($this->limit());
        return $this->sendResponse(trans('messages.list', ['attr' => 'Budget']), BudgetResource::collection($results), true);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(BudgetRequest $request)
    {
        $payload = $request->validated();

        // check if budget exist for category and date
        $budget = $this->repository->where('category_id', $payload['category_id'])
            ->where('end_periode', '>=', $payload['start_periode'])
            ->first();
        if ($budget) {
            return $this->sendError("Budget already exist for this category and date");
        }

        $create = $this->repository->create($payload);
        BudgetHistory::create([
            'budget_id' => $create->id,
            'new_value' => $create->amount,
            'old_value' => 0,
            'action' => ActionBudgetHistory::CREATE,
        ]);
        return $this->sendResponse(trans('messages.create', ['attr' => "Budget"]));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $find = $this->repository->find($id);
        return $this->sendResponse(trans('messages.list', ['attr' => "Budget"]), new BudgetResource($find));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(BudgetRequest $request, string $id)
    {
        $data = $request->validated();
        $find = $this->repository->find($id);

        BudgetHistory::create([
            'budget_id' => $find->id,
            'action' => ActionBudgetHistory::UPDATE,
            'new_value' => $find->amount + $data['amount'],
            'old_value' => $find->amount
        ]);

        $data['amount'] = $find->amount + $data['amount'];

        $find->update($data);
        return $this->sendResponse(trans('messages.update', ['attr' => "Budget"]), new BudgetResource($find));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $find = $this->repository->find($id);
        $find->delete();
        return $this->sendResponse(trans('messages.destroy', ['attr' => "Budget"]), new BudgetResource($find));
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
        return $this->sendResponse(trans('messages.destroy', ['attr' => "Budget"]));
    }

    // export resources
}
