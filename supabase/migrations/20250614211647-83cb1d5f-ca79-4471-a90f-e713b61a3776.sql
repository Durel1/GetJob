
-- Supprimer les anciennes colonnes inutiles si elles existent
ALTER TABLE student_profiles 
  DROP COLUMN IF EXISTS bio,
  DROP COLUMN IF EXISTS availability,
  DROP COLUMN IF EXISTS linkedin_url,
  DROP COLUMN IF EXISTS github_url,
  DROP COLUMN IF EXISTS cv_url,
  DROP COLUMN IF EXISTS university,
  DROP COLUMN IF EXISTS field_of_study,
  DROP COLUMN IF EXISTS graduation_year,
  DROP COLUMN IF EXISTS skills;

-- Ajouter les nouvelles colonnes, ne pas dupliquer si elles existent déjà
ALTER TABLE student_profiles
  ADD COLUMN IF NOT EXISTS "Nom_etudant" text,
  ADD COLUMN IF NOT EXISTS "Etablissement" text,
  ADD COLUMN IF NOT EXISTS "Dernier_diplome" text,
  ADD COLUMN IF NOT EXISTS "anne_obtention" integer,
  ADD COLUMN IF NOT EXISTS "competence" text,
  ADD COLUMN IF NOT EXISTS "URL_CV" text,
  ADD COLUMN IF NOT EXISTS "URL_Image" text;
