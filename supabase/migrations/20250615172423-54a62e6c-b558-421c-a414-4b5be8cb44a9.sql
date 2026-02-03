
-- 1. Renommer la table principale
ALTER TABLE public.student_profiles RENAME TO "Profil_Etudiants";

-- 2. Renommer la clé primaire (ancienne "id" doit devenir "id_profil_Etudiant")
ALTER TABLE public."Profil_Etudiants" RENAME COLUMN id TO id_profil_Etudiant;

-- 3. Ajouter la colonne de référence vers etudiants (id_Etudiant)
ALTER TABLE public."Profil_Etudiants"
  ADD COLUMN id_Etudiant uuid;

-- 4. Ajouter les nouvelles colonnes requises (si elles n’existent pas déjà)
ALTER TABLE public."Profil_Etudiants"
  ADD COLUMN IF NOT EXISTS "Localisation" text,
  ADD COLUMN IF NOT EXISTS "Etablissement" text,
  ADD COLUMN IF NOT EXISTS "Domaine_Etudes" text,
  ADD COLUMN IF NOT EXISTS "Competances" text,
  ADD COLUMN IF NOT EXISTS "Niveau_etudes" text,
  ADD COLUMN IF NOT EXISTS "Disponibilité" text,
  ADD COLUMN IF NOT EXISTS "URL_CV" text,
  ADD COLUMN IF NOT EXISTS "URL_GitHub" text;

-- 5. Ajouter la foreign key vers etudiants
DO $$
BEGIN
  IF NOT EXISTS (
      SELECT 1 FROM information_schema.table_constraints
      WHERE constraint_name = 'Profil_Etudiants_id_Etudiant_fkey'
        AND table_name = 'Profil_Etudiants'
  ) THEN
    ALTER TABLE public."Profil_Etudiants"
      ADD CONSTRAINT "Profil_Etudiants_id_Etudiant_fkey"
      FOREIGN KEY (id_Etudiant)
      REFERENCES etudiants(id)
      ON DELETE CASCADE;
  END IF;
END;
$$;

-- 6. Supprimer toutes les autres anciennes colonnes inutiles
ALTER TABLE public."Profil_Etudiants"
  DROP COLUMN IF EXISTS "Nom_etudant",
  DROP COLUMN IF EXISTS "Dernier_diplome",
  DROP COLUMN IF EXISTS "anne_obtention",
  DROP COLUMN IF EXISTS "competence",
  DROP COLUMN IF EXISTS "Github_profile",
  DROP COLUMN IF EXISTS "URL_CV",
  DROP COLUMN IF EXISTS "URL_Image";

-- 7. (Optionnel mais recommandé) Renommer la séquence si utilisée pour l'id
-- (À n'utiliser que si la colonne est SERIAL, généralement non pertinent pour UUID)
