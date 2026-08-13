<?php

namespace App\Services;

use App\Data\Resources\PermissionResourceData;
use App\Repositories\PermissionRepository;
use App\Support\PermissionMeta;
use Spatie\LaravelData\DataCollection;

class PermissionService
{
    /**
     * Create a new class instance.
     */
    public function __construct(protected PermissionRepository $permissionRepository)
    {
        //
    }

    /**
     * Get all available permissions.
     *
     * @return DataCollection<PermissionResourceData>
     */
    function getAvailablePermissions():DataCollection
    {
        $permissions = $this->permissionRepository->all()
            ->map(function($permission){
                $meta = PermissionMeta::from($permission->name);

                return [
                    'id' => $permission->id,
                    'name' => $permission->name,
                    ...$meta->toArray(),
                ];
            })
            ->toArray();

        return new DataCollection(PermissionResourceData::class, $permissions);
    }
}
