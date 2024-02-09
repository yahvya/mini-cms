<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Website extends Model{
    use HasFactory;

    public $timestamps = false;
    protected $table = "website";

    public function articles():HasMany{
        return $this->hasMany(ArticleModel::class,"id_1");
    }
}
