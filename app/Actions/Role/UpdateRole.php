<?php

namespace App\Actions\Role;

use App\Models\Role;
use Illuminate\Support\Facades\DB;
use Spatie\QueueableAction\QueueableAction;

class UpdateRole
{
    use QueueableAction;

    /**
     * Create a new action instance.
     *
     * @return void
     */
    public function __construct()
    {
        // Prepare the action for execution, leveraging constructor injection.
    }

    /**
     * Execute the action.
     * @param Role $role
     * @param array{name: string, permissions: array<int,string>} $data
     * @return Role
     */
    public function execute(Role $role, array $data):Role
    {
        return DB::transaction(function () use ($role, $data) {
            $role->update(['name' => $data['name']]);
            $role->syncPermissions($data['permissions']);
            return $role;
        });
    }
}
