
-- Supprimer toutes les politiques RLS associées à la table "companies"
DROP POLICY IF EXISTS "Recruteurs peuvent voir leurs entreprises" ON companies;
DROP POLICY IF EXISTS "Recruteurs peuvent créer des entreprises" ON companies;
DROP POLICY IF EXISTS "Recruteurs peuvent modifier leurs entreprises" ON companies;
