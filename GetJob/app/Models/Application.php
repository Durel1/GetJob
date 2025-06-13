<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
    // Autoriser les colonnes qu’on peut remplir via create() ou update()
    protected $fillable = [
        'offre_id',
        'candidat_id',
        'lettre_motivation',
    ];

    /**
     * Relation avec l’offre (une candidature appartient à une offre)
     */
    public function offre()
    {
        return $this->belongsTo(Offre::class, 'offre_id');
    }

    /**
     * Relation avec le candidat (une candidature appartient à un candidat)
     */
    public function candidat()
    {
        return $this->belongsTo(Candidat::class, 'candidat_id');
    }
}
