<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsersSeeder extends Seeder
{
    public function run(): void
    {
        User::create([
            'name' => 'Admin',
            'email' => 'admin@example.com',
            'password' => Hash::make('admin@example.comA1'),
            'role' => 'admin',
        ]);
        User::create([
            'name' => 'Client',
            'email' => 'client@example.com',
            'password' => Hash::make('client@example.comA1'),
            'role' => 'client',
        ]);
    }
}
