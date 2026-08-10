<?php

namespace App\Providers;

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\ServiceProvider;

class BlueprintMacroProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        Blueprint::macro('auditColumns', function (bool $softDeletes = false) {
            /** @var Blueprint $this */
            $this->timestamps();
            $this->userstamps();
            if ($softDeletes) {
                $this->softDeletes();
                $this->userstampSoftDeletes();
            }
        });

        Blueprint::macro('dropAuditColumns', function (bool $softDeletes = false) {
            /** @var Blueprint $this */
            $this->dropTimestamps();
            $this->dropUserstamps();
            if ($softDeletes) {
                $this->dropSoftDeletes();
                $this->dropUserstampSoftDeletes();
            }
        });
    }
}
