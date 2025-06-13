<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Application;
use App\Models\Offre;
use App\Models\Candidat;

class ApplicationController extends Controller
{
    /**
     * Postuler à une offre.
     * Route: POST /api/candidatures
     */
    public function store(Request $request)
    {
        // Valider les données reçues
        $validated = $request->validate([
            'offre_id' => 'required|exists:offres,id', // L'offre doit exister
            'candidat_id' => 'required|exists:candidats,id', // Le candidat doit exister
            'lettre_motivation' => 'nullable|string|max:1000', // Facultatif
        ]);

        // Vérifier que le candidat n’a pas déjà postulé à cette offre
        $existingApplication = Application::where('offre_id', $validated['offre_id'])
            ->where('candidat_id', $validated['candidat_id'])
            ->first();

        if ($existingApplication) {
            return response()->json([
                'message' => 'Vous avez déjà postulé à cette offre.'
            ], 409);
        }

        // Créer la candidature
        $application = Application::create($validated);

        return response()->json([
            'message' => 'Candidature envoyée avec succès.',
            'data' => $application
        ], 201);
    }

    /**
     * Afficher les candidatures d’un candidat
     * Route: GET /api/mes-candidatures/{candidat_id}
     */
    public function mesCandidatures($candidat_id)
    {
        $candidatures = Application::where('candidat_id', $candidat_id)
            ->with('offre')
            ->get();

        return response()->json([
            'data' => $candidatures
        ]);
    }
}
