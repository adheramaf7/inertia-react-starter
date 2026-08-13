<?php

namespace App\Http\Requests\Role;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class SaveRoleRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required',Rule::unique('roles','name')->ignore($this->route('role'))],
            'permissions' => ['required', 'array', 'min:1',],
            'permissions.*' => ['required', 'string', 'exists:permissions,name'],
        ];
    }
}
