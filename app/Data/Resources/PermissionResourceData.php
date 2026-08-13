<?php

namespace App\Data\Resources;

use Spatie\LaravelData\Attributes\MapInputName;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;
use Spatie\LaravelData\Optional;

#[MapInputName(SnakeCaseMapper::class)]
class PermissionResourceData extends Data
{
    public function __construct(
        public int $id,
        public string $name,
        public Optional|string $label,
        public Optional|string $group,
        public Optional|string $description
    ) {}
}
