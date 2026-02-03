
-- Table des étudiants
CREATE TABLE public.etudiants (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nom TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  telephone TEXT,
  mot_de_passe TEXT NOT NULL
);

-- Table des recruteurs
CREATE TABLE public.recruteurs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nom TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  telephone TEXT,
  nom_entreprise TEXT NOT NULL,
  mot_de_passe TEXT NOT NULL
);

-- (Facultatif) Si tu veux supprimer la table profiles (ATTENTION : cela enlève toute la logique liée à Supabase Auth natif)
-- DROP TABLE IF EXISTS public.profiles;

-- On n'ajoute pas ici de triggers ni RLS : à adapter selon ton besoin (sinon tout le monde peut accéder/modifier toutes les données par défaut).

