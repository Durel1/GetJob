<?php

namespace App\Http\Controllers;

use App\Models\JobOffer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class JobOfferController extends Controller
{
    // Méthode pour publier une offre
    public function store(Request $request)
    {
        // Validation des données envoyées par le recruteur
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'location' => 'required|string|max:255',
            'deadline' => 'required|date',
        ]);

        // Création de l'offre d'emploi
        $offer = JobOffer::create([
            'recruteur_id' => Auth::id(),     // Associe l'offre au recruteur connecté
            'title' => $validated['title'],
            'description' => $validated['description'],
            'location' => $validated['location'],
            'deadline' => $validated['deadline'],
        ]);

        return response()->json([
            'message' => 'Offre créée avec succès',
            'offer' => $offer
        ], 201);
    }
}
