<?php

namespace App\Enums\Attributes;

use Attribute;

#[Attribute(Attribute::TARGET_CLASS_CONSTANT)]
class Label
{
    /**
     * Create a new class instance.
     */
    public function __construct(
        public readonly string $value,
    ) {}
}
