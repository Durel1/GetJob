
-- Renommer la table "companies" en "Entreprises"
ALTER TABLE companies RENAME TO "Entreprises";

-- Renommer la colonne "id" en "id_entreprise"
ALTER TABLE "Entreprises" RENAME COLUMN id TO id_entreprise;

-- Supprimer les colonnes inutiles
ALTER TABLE "Entreprises" DROP COLUMN IF EXISTS recruiter_id;
ALTER TABLE "Entreprises" DROP COLUMN IF EXISTS name;
ALTER TABLE "Entreprises" DROP COLUMN IF EXISTS industry;
ALTER TABLE "Entreprises" DROP COLUMN IF EXISTS phone;
ALTER TABLE "Entreprises" DROP COLUMN IF EXISTS size_range;
ALTER TABLE "Entreprises" DROP COLUMN IF EXISTS location;
ALTER TABLE "Entreprises" DROP COLUMN IF EXISTS description;
ALTER TABLE "Entreprises" DROP COLUMN IF EXISTS logo_url;
ALTER TABLE "Entreprises" DROP COLUMN IF EXISTS website;

-- Ajouter la colonne id_recruteur faisant référence à recruteurs(id_recruteur)
ALTER TABLE "Entreprises"
  ADD COLUMN id_recruteur UUID NOT NULL REFERENCES recruteurs(id_recruteur);

-- Ajouter les nouvelles colonnes demandées
ALTER TABLE "Entreprises"
  ADD COLUMN Nom_Entreprise TEXT NOT NULL,
  ADD COLUMN Localisation TEXT,
  ADD COLUMN Description TEXT,
  ADD COLUMN Domaine TEXT,
  ADD COLUMN Site_web TEXT;

-- Optionnel : Renommer les timestamps si souhaité
-- ALTER TABLE "Entreprises" RENAME COLUMN created_at TO created_at;
-- ALTER TABLE "Entreprises" RENAME COLUMN updated_at TO updated_at;
