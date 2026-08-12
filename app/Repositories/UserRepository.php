<?php

namespace App\Repositories;

use App\Models\User;

class UserRepository
{
    /**
     * Get the user's permissions.
     *
     * @return array<int,string>
     */
    function getUserPermissions(User $user):array
    {
        return $user->getAllPermissions()->pluck('name')->unique()->toArray();
    }
}
