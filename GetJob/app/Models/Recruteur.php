<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Recruteur extends Authenticatable
{
    use HasFactory;

    protected $fillable = [
        'nom_entreprise',
        'nom_recruteur',
        'email',
        'password',
        'logo',
    ];

    // Un recruteur peut publier plusieurs offres
    public function offres()
    {
        return $this->hasMany(Offre::class);
    }
}
