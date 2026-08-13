<?php

namespace App\Support;

class PermissionMeta
{

    public function __construct(public string $label, public string $group, public ?string $description)
    {
    }

    public static function from(string $permission): self
    {
        return self::generatePermissionMeta($permission);
    }

    /**
     * Convert the permission meta to an array.
     * @return array{label: string, group: string, description: ?string}
     */
    public function toArray(): array
    {
        return [
            'label' => $this->label,
            'group' => $this->group,
            'description' => $this->description,
        ];
    }

    private static function generatePermissionMeta(string $permission): self
    {
        [$subject, $action] = array_pad(
            explode('.', $permission, 2),
            2,
            null,
        );

        if (! $subject || ! $action) {
            throw new \InvalidArgumentException("Invalid permission format: {$permission}");
        }

        $subjectLabel = str($subject)
            ->replace(['-', '_'], ' ')
            ->headline()
            ->toString();

        $actions = [
            'view' => [
                'label' => 'View',
                'description' => fn () => "View a specific {$subject}.",
            ],

            'view-any' => [
                'label' => 'View Any',
                'description' => fn () => "View a list of {$subject}s.",
            ],

            'create' => [
                'label' => 'Create',
                'description' => fn () => "Create a new {$subject}.",
            ],

            'update' => [
                'label' => 'Update',
                'description' => fn () => "Update an existing {$subject}.",
            ],

            'delete' => [
                'label' => 'Delete',
                'description' => fn () => "Delete an existing {$subject}.",
            ],
        ];

        $actionConfig = $actions[$action] ?? null;

        return new self(
            $actionConfig
                ? "{$actionConfig['label']} {$subjectLabel}"
                : null,
            $subjectLabel,
            $actionConfig
                ? $actionConfig['description']()
                : null,
        );
    }
}
