
-- 1. Supprimer toutes les policies RLS existantes sur la table "Candidatures"
DO $$
DECLARE
  pol RECORD;
BEGIN
  FOR pol IN 
    SELECT policyname FROM pg_policies WHERE tablename = 'Candidatures'
  LOOP
    EXECUTE 'DROP POLICY IF EXISTS "' || pol.policyname || '" ON "Candidatures";';
  END LOOP;
END;
$$;

-- 2. Supprimer toutes les anciennes colonnes de la table "Candidatures"
ALTER TABLE "Candidatures"
  DROP COLUMN IF EXISTS id_candidature,
  DROP COLUMN IF EXISTS student_id,
  DROP COLUMN IF EXISTS job_offer_id,
  DROP COLUMN IF EXISTS status,
  DROP COLUMN IF EXISTS applied_at,
  DROP COLUMN IF EXISTS updated_at,
  DROP COLUMN IF EXISTS cover_letter;

-- 3. Ajouter les nouvelles colonnes demandées
ALTER TABLE "Candidatures"
  ADD COLUMN id_profil_etudiant uuid REFERENCES "Profil_Etudiants"(id_profil_etudiant),
  ADD COLUMN id_offre_emploi uuid REFERENCES offre_emploi(id_offre_emploi),
  ADD COLUMN id_etudiant uuid REFERENCES etudiants(id_etudiant);

-- (optionnel) : RLS à adapter après modification si besoin
