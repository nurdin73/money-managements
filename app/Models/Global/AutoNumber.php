<?php

namespace App\Models\Global;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AutoNumber extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $fillable = [
        'key',
        'template',
        'sequence'
    ];
}
