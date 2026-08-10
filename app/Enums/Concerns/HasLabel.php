<?php

namespace App\Enums\Concerns;

use App\Enums\Attributes\Label;
use ReflectionEnum;

/**
 * @mixin \UnitEnum
 * @phpstan-require-implements \UnitEnum
 */
trait HasLabel
{
    public function label(): string
    {
        /** @var \UnitEnum $this */

        $reflection = new ReflectionEnum(static::class);

        $case = $reflection->getCase($this->name);

        $attributes = $case->getAttributes(Label::class);

        if ($attributes !== []) {
            return $attributes[0]->newInstance()->value;
        }

        return str($this->name)
            ->headline()
            ->toString();
    }
}
