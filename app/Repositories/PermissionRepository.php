<?php

namespace App\Repositories;

use App\Models\Permission;
use Illuminate\Database\Eloquent\Collection;

class PermissionRepository
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Get all available permissions.
     *
     * @return Collection<int, Permission>
     */
    public function all(): Collection
    {
        return Permission::query()
            ->get();
    }
}
