
-- Renommer la table applications en Candidatures
ALTER TABLE applications RENAME TO "Candidatures";

-- Renommer la contrainte de clé étrangère si nécessaire
ALTER TABLE "Candidatures" DROP CONSTRAINT IF EXISTS applications_job_offer_id_fkey;

-- Recréer la contrainte avec le bon nom
ALTER TABLE "Candidatures"
  ADD CONSTRAINT candidatures_job_offer_id_fkey
  FOREIGN KEY (job_offer_id) REFERENCES offre_emploi(id_offre_emploi);
