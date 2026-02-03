
-- Renommer la table job_offers en offre_emploi
ALTER TABLE job_offers RENAME TO offre_emploi;

-- Supprimer la contrainte de clé étrangère existante sur applications (si elle existe)
ALTER TABLE applications DROP CONSTRAINT IF EXISTS applications_job_offer_id_fkey;

-- Ajouter une contrainte de clé étrangère vers la nouvelle table/colonne
ALTER TABLE applications
  ADD CONSTRAINT applications_job_offer_id_fkey FOREIGN KEY (job_offer_id) REFERENCES offre_emploi(id_offre_emploi);
