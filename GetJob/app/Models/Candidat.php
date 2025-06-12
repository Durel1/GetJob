<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;

class Candidat extends Authenticatable
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'email',
        'password',
        'telephone',
        'cv',
        'image',
    ];

    // Un candidat peut avoir plusieurs candidatures
    public function candidatures()
    {
        return $this->hasMany(Candidature::class);
    }
}
