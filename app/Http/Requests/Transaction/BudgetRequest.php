<?php

namespace App\Http\Requests\Transaction;

use App\Models\Transaction\Budget;
use App\Models\Transaction\IncomeExpense;
use Illuminate\Foundation\Http\FormRequest;

class BudgetRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $id = request()->route()->parameter('id') ?: '';
        if ($id != '') {
            return Budget::where('user_id', auth()->id())->where('id', $id)->exists();
        }
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:100',
            'amount' => 'required|numeric',
            'category_id' => 'nullable|exists:categories,id',
            'start_periode' => 'required|date',
            'end_periode' => 'required|date',
        ];
    }
}
