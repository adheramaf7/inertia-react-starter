<?php

namespace App\Models;

use Mattiverse\Userstamps\Traits\Userstamps;
use Spatie\Permission\Models\Role as ModelsRole;

class Role extends ModelsRole
{
    use Userstamps;
}
