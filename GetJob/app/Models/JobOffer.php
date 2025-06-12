<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JobOffer extends Model
{
    use HasFactory;

    protected $fillable = [
        'recruteur_id',
        'title',
        'description',
        'location',
        'deadline'
    ];

    public function recruiter()
    {
        return $this->belongsTo(Recruteur::class);
    }
}

