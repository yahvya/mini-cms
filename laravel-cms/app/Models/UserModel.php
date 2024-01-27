<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class UserModel extends Model
{
    use HasFactory;

    protected $table = "wuser";
    public $timestamps = false;

    public function websites():HasMany{
        return $this->hasMany(Website::class,"user_id");
    }
}
