<?php

namespace App\Http\Requests\Master;

use App\Models\Master\Category;
use Illuminate\Foundation\Http\FormRequest;

class CategoryRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $id = request()->route()->parameter('id') ?: '';
        if ($id != '') {
            return Category::where('user_id', auth()->id())->where('id', $id)->exists();
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
            'color' => 'nullable|string|max:10',
            'is_active' => 'required|boolean'
        ];
    }
}
