<?php

namespace App\Data\Resources;

use Carbon\CarbonImmutable;
use DateTime;
use Spatie\LaravelData\Attributes\MapInputName;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\DataCollection;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;
use Spatie\LaravelData\Optional;

#[MapInputName(SnakeCaseMapper::class)]
class UserResourceData extends Data
{
    public function __construct(
        public int $id,
        public string $name,
        public string $email,
        public CarbonImmutable $emailVerifiedAt,
        public bool $isSuperadmin,
        public CarbonImmutable $createdAt,
        public CarbonImmutable $updatedAt,

        /** @var DataCollection<RoleResourceData>|Optional */
        public DataCollection|Optional $roles,
    ) {}
}
