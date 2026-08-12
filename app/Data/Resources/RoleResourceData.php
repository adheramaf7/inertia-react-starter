<?php

namespace App\Data\Resources;

use Spatie\LaravelData\Attributes\MapInputName;
use Spatie\LaravelData\Data;
use Spatie\LaravelData\Mappers\SnakeCaseMapper;

#[MapInputName(SnakeCaseMapper::class)]
class RoleResourceData extends Data
{
    public function __construct(
        public int $id,
        public string $name,
    ) {}
}
