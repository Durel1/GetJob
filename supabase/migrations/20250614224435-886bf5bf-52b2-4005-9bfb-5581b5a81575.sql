
-- 1. Supprimer la contrainte FK existante entre student_profiles et profiles
ALTER TABLE student_profiles
  DROP CONSTRAINT IF EXISTS student_profiles_id_fkey;

-- 2. Créer la nouvelle FK vers etudiants(id)
ALTER TABLE student_profiles
  ADD CONSTRAINT student_profiles_id_fkey FOREIGN KEY (id) REFERENCES etudiants(id) ON DELETE CASCADE;
