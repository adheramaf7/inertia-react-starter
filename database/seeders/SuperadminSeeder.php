<?php

namespace Database\Seeders;

use App\Enums\SystemRole;
use App\Models\User;
use Illuminate\Database\Seeder;

class SuperadminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $superadminUser = User::role(SystemRole::Superadmin->value)->first();

        if ($superadminUser) {
            return;
        }

        $newUser = User::create([
            'name'              => 'Superadmin',
            'email'             => 'superadmin@mail.com',
            'password'          => 'password',
            'email_verified_at' => now(),
        ]);

        $newUser->assignRole(SystemRole::Superadmin->value);
    }
}
