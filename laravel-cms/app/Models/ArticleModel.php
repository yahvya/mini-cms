<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ArticleModel extends Model{
    use HasFactory;

    protected $table = "articles";
    public $timestamps = false;

    public function feedbacks():HasMany{
        return $this->hasMany(FeedbackModel::class,"id_1");
    }
}


