<?php

namespace App\Http\Controllers\Transaction;

use App\ActionBudgetHistory;
use App\Http\Controllers\Controller;
use App\Repositories\Transaction\IncomeExpenseRepository;
use App\Http\Requests\Transaction\IncomeExpenseRequest;
use App\Http\Resources\Transaction\IncomeExpenseResource;
use App\Models\Transaction\BudgetHistory;
use App\Repositories\Transaction\BudgetRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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
    protected BudgetRepository $budgetRepository;

    public function __construct(IncomeExpenseRepository $repository, BudgetRepository $budgetRepository)
    {
        $this->repository = $repository;
        $this->budgetRepository = $budgetRepository;
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
        $message = "Pemasukkan berhasil disimpan";
        if ($request->type == 'expense') {
            $message = "Pengeluaran berhasil disimpan";
        }
        $overBudget = false;
        $payload = $request->validated();
        DB::beginTransaction();
        try {
            $create = $this->repository->create($payload);

            if ($payload['type'] == 'expense') {
                $budget = $this->budgetRepository->getBudgetByCategory($payload['category_id']);
                if ($budget && $budget->amount < $payload['amount']) {
                    $overBudget = true;
                    $message = "Anggaran kategori di periode ini melebihi batas";
                }
                if ($budget) {
                    BudgetHistory::create([
                        'budget_id' => $budget->id,
                        'old_value' => $budget->amount,
                        'new_value' => $budget->amount - $payload['amount'],
                        'action' => $overBudget ? ActionBudgetHistory::EXCEED : ActionBudgetHistory::UPDATE,
                    ]);
                    $budget->update([
                        'amount' => $budget->amount - $payload['amount']
                    ]);
                    $create->budget_id = $budget->id;
                    $create->save();
                }
            }
            DB::commit();
            return $this->sendResponse($message, [
                'over_budget' => $overBudget
            ]);
        } catch (\Throwable $th) {
            DB::rollBack();
            throw $th;
        }
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

        if ($find->type == 'expense') {
            $budget = $this->budgetRepository->getBudgetByCategory($find->category_id);
            if ($budget) {
                BudgetHistory::create([
                    'budget_id' => $budget->id,
                    'old_value' => $budget->amount,
                    'new_value' => $budget->amount + $find->amount,
                    'action' => ActionBudgetHistory::DELETE,
                ]);
                $budget->update([
                    'amount' => $budget->amount + $find->amount
                ]);
            }
        }

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
