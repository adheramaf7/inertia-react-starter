<?php

namespace App\Repositories;

use App\Enums\SystemRole;
use App\Models\Role;
use Illuminate\Database\Eloquent\Collection;

class RoleRepository
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    function getNonSuperadminRoles(?bool $includeUsersCount = false): Collection
    {
        return Role::query()
            ->when($includeUsersCount, fn($query) => $query->withCount('users'))
            ->where('name', '!=', SystemRole::Superadmin->value)
            ->get();
    }
}
