<?php

namespace Database\Seeders;

use App\Enums\SystemRole;
use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Spatie\Permission\PermissionRegistrar;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        app(PermissionRegistrar::class)->forgetCachedPermissions();

        $this->seedPermissions();

        Role::updateOrCreate(['name' => SystemRole::Superadmin]);

        app(PermissionRegistrar::class)->forgetCachedPermissions();
    }

    function seedPermissions(): void
    {
        $defaultResourceActions = ['view-any', 'view', 'create', 'update', 'delete'];

        $permissions = [
            'role' => $defaultResourceActions,
            'user' => $defaultResourceActions,
        ];

        $insertedPermissions = [];
        foreach ($permissions as $group => $actions) {
            foreach ($actions as $action) {
                $permission = Permission::firstOrCreate([
                    'name' => "$group.$action",
                ]);

                $insertedPermissions[] = $permission->id;
            }
        }

        DB::table('model_has_permissions')->whereNotIn('permission_id', $insertedPermissions)->delete();
        DB::table('role_has_permissions')->whereNotIn('permission_id', $insertedPermissions)->delete();
        DB::table('permissions')->whereNotIn('id', $insertedPermissions)->delete();
    }
}
