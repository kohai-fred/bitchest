<?php

// app/Http/Controllers/UserController.php

namespace App\Http\Controllers;

use App\Http\Requests\UserFormRequest;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function getCurrentUser()
    {
        return Auth::user();
    }

    public function checkEmail(Request $request)
    {
        $email = $request->input('email');
        $exists = User::where('email', $email)->exists();

        return response()->json(['exists' => $exists, 'email' => $email]);
    }

    public function index()
    {
        if (Auth::user()->role !== 'admin') {
            return response()->json(['message' => 'Permission denied'], 403);
        }
        return User::all();
    }

    public function store(UserFormRequest $request)
    {
        $user = User::create([
            'firstname' => $request->input('firstname'),
            'lastname' => $request->input('lastname'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password')),
            'role' => $request->input('role'),
            'presentation' => $request->input('presentation'),
        ]);

        return response()->json(['message' => 'User created successfully', 'user' => $user]);
    }


    public function update(UserFormRequest $request, User $user)
    {
        $validatedData = $request->validated();
        $user->update($validatedData);
        return response()->json(['message' => 'User updated successfully', 'user' => $user]);
    }

    public function destroy(User $user)
    {
        $user->delete();
        return User::all();
    }
}
