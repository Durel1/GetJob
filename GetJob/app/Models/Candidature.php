<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Candidature extends Model
{
    use HasFactory;

    protected $fillable = [
        'offre_id',
        'candidat_id',
        'message',
        'cv_personnalise',
    ];

    // Une candidature appartient à un candidat
    public function candidat()
    {
        return $this->belongsTo(Candidat::class);
    }

    // Une candidature est liée à une offre
    public function offre()
    {
        return $this->belongsTo(Offre::class);
    }
}
