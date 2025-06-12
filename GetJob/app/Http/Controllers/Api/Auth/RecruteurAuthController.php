<?php

namespace App\Http\Controllers\Api\Auth;

use App\Http\Controllers\Controller;
use App\Models\Recruteur;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class RecruteurAuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'nom_entreprise' => 'required|string|max:255',
            'nom_recruteur' => 'required|string|max:255',
            'email' => 'required|string|email|unique:recruteurs,email',
            'password' => 'required|string|min:6|confirmed',
        ]);

        $recruteur = Recruteur::create([
            'nom_entreprise' => $request->nom_entreprise,
            'nom_recruteur' => $request->nom_recruteur,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        $token = $recruteur->createToken('auth_token')->plainTextToken;

        return response()->json([
            'recruteur' => $recruteur,
            'token' => $token,
        ], 201);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        $recruteur = Recruteur::where('email', $request->email)->first();

        if (!$recruteur || !Hash::check($request->password, $recruteur->password)) {
            throw ValidationException::withMessages([
                'email' => ['Les informations de connexion sont incorrectes.'],
            ]);
        }

        $token = $recruteur->createToken('auth_token')->plainTextToken;

        return response()->json([
            'recruteur' => $recruteur,
            'token' => $token,
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json(['message' => 'Déconnecté avec succès']);
    }
}
