<?php

namespace App\Http\Controllers\AccessManagement;

use App\Actions\Role\CreateRole;
use App\Actions\Role\UpdateRole;
use App\Data\Resources\RoleResourceData;
use App\Http\Controllers\Controller;
use App\Http\Requests\Role\SaveRoleRequest;
use App\Models\Role;
use App\Repositories\RoleRepository;
use App\Services\PermissionService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class RoleController extends Controller
{

    function __construct(protected RoleRepository $roleRepository, protected PermissionService $permissionService)
    {
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        Gate::authorize('role.view-any');

        return inertia('roles/index',[
            'roles' => RoleResourceData::collect($this->roleRepository->getNonSuperadminRoles(includeUsersCount:true)),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        Gate::authorize('role.create');

        return inertia('roles/create',[
            'permissions' => $this->permissionService->getAvailablePermissions(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(SaveRoleRequest $request, CreateRole $createRole)
    {
        Gate::authorize('role.create');

        $createRole->execute($request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Role has been created successfully.']);

        return to_route('roles.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(Role $role)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Role $role)
    {
        Gate::authorize('role.update');

        $role->load(['permissions']);

        return inertia('roles/edit', [
            'role' => RoleResourceData::from($role),
            'permissions' => $this->permissionService->getAvailablePermissions(),
]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(SaveRoleRequest $request, UpdateRole $updateRole, Role $role)
    {
        Gate::authorize('role.update');

        $updateRole->execute($role, $request->validated());

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Role has been updated successfully.']);

        return to_route('roles.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Role $role)
    {
        Gate::authorize('role.delete');

        $role->delete();

        Inertia::flash('toast', ['type' => 'success', 'message' => 'Role has been deleted successfully.']);

        return to_route('roles.index');
    }
}
