<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Models\Candidat;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class CandidatAuthController extends Controller
{
    // 🟢 Inscription candidat
    public function register(Request $request)
    {
        // Validation des données envoyées
        $request->validate([
            'nom' => 'required|string|max:255',
            'email' => 'required|string|email|unique:candidats,email',
            'password' => 'required|string|min:6|confirmed',
            'telephone' => 'nullable|string',
        ]);

        // Création du candidat
        $candidat = Candidat::create([
            'nom' => $request->nom,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'telephone' => $request->telephone,
        ]);

        // Générer un token pour rester connecté
        $token = $candidat->createToken('auth_token')->plainTextToken;

        return response()->json([
            'candidat' => $candidat,
            'token' => $token,
        ], 201);
    }

    // 🟢 Connexion candidat
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        $candidat = Candidat::where('email', $request->email)->first();

        // Vérifie si le mot de passe est correct
        if (!$candidat || !Hash::check($request->password, $candidat->password)) {
            throw ValidationException::withMessages([
                'email' => ['Les informations de connexion sont incorrectes.'],
            ]);
        }

        $token = $candidat->createToken('auth_token')->plainTextToken;

        return response()->json([
            'candidat' => $candidat,
            'token' => $token,
        ]);
    }

    // 🔴 Déconnexion
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json(['message' => 'Déconnecté avec succès']);
    }
}
