<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Offre extends Model
{
    use HasFactory;

    protected $fillable = [
        'recruteur_id',
        'titre',
        'description',
        'lieu',
        'type_contrat',
        'date_expiration',
    ];

    // Une offre appartient à un recruteur
    public function recruteur()
    {
        return $this->belongsTo(Recruteur::class);
    }

    // Une offre peut avoir plusieurs candidatures
    public function candidatures()
    {
        return $this->hasMany(Candidature::class);
    }
}
