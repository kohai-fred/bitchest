<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UserFormRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        $userId = $this->route('user');

        return [
            'firstname' => ['required', 'string'],
            'lastname' => ['required', 'string'],
            'email' => [
                'required',
                'email',
                Rule::unique('users')->ignore($userId),
            ],
            'password' => ['required', 'string', 'min:8', 'regex:/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/'],
            'role' => ['required', 'in:admin,client'],
            'presentation' => ['nullable', 'string', 'max:200'],
        ];
    }
}
