<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Accident extends Model
{
    use HasFactory;

    protected $fillable = [
        'caseName',
        'location',
        'details',
        'status',
        'coords',
    ];
}
