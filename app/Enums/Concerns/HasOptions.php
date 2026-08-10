<?php

namespace App\Enums\Concerns;

use App\Enums\Contracts\LabelableEnum;
use BackedEnum;

/**
 * @phpstan-require-implements LabelableEnum
 *
 * @method static array cases()
 */
trait HasOptions
{
    /**
     * @return array<int, array<string, string>>
     */
    public static function options(): array
    {
        return collect(static::cases())
            ->map(fn ($case) => [
                'value' => $case instanceof BackedEnum ? $case->value : $case->name,
                'label' => $case->label(),
            ])
            ->all();
    }

    /**
     * @return array<string, string>
     */
    public static function choices(): array
    {
        return collect(static::cases())
            ->mapWithKeys(fn ($case) => [
                ($case instanceof BackedEnum ? $case->value : $case->name) => $case->label(),
            ])
            ->all();
    }
}
