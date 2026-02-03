
-- 1. Supprimer toutes les policies dépendantes de colonne is_active et recruiter_id
DROP POLICY IF EXISTS "Les offres actives sont visibles publiquement" ON offre_emploi;
DROP POLICY IF EXISTS "Recruteurs peuvent voir leurs offres" ON offre_emploi;
DROP POLICY IF EXISTS "Recruteurs peuvent créer des offres" ON offre_emploi;
DROP POLICY IF EXISTS "Recruteurs peuvent modifier leurs offres" ON offre_emploi;
DROP POLICY IF EXISTS "Recruteurs peuvent voir les candidatures à leurs offres" ON applications;
DROP POLICY IF EXISTS "Recruteurs peuvent modifier le statut des candidatures" ON applications;

-- 2. Renommer la colonne id en id_offre_emploi
ALTER TABLE offre_emploi RENAME COLUMN id TO id_offre_emploi;

-- 3. Supprimer toutes les autres colonnes existantes
ALTER TABLE offre_emploi
  DROP COLUMN IF EXISTS company_id,
  DROP COLUMN IF EXISTS recruiter_id,
  DROP COLUMN IF EXISTS contract_type,
  DROP COLUMN IF EXISTS created_at,
  DROP COLUMN IF EXISTS description,
  DROP COLUMN IF EXISTS duration,
  DROP COLUMN IF EXISTS is_active,
  DROP COLUMN IF EXISTS location,
  DROP COLUMN IF EXISTS requirements,
  DROP COLUMN IF EXISTS salary_range,
  DROP COLUMN IF EXISTS start_date,
  DROP COLUMN IF EXISTS application_deadline,
  DROP COLUMN IF EXISTS title,
  DROP COLUMN IF EXISTS updated_at;

-- 4. Ajouter les nouvelles colonnes demandées
ALTER TABLE offre_emploi
  ADD COLUMN id_entreprise uuid REFERENCES "Entreprises"(id_entreprise),
  ADD COLUMN id_recruteur uuid REFERENCES recruteurs(id_recruteur),
  ADD COLUMN Type_contrat text,
  ADD COLUMN Description text,
  ADD COLUMN Niveau_Etude text,
  ADD COLUMN Competance text,
  ADD COLUMN Horaires_travail text;
