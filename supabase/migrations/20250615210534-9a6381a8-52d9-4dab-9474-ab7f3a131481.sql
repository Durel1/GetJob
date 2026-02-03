
-- 1. Ajouter la colonne id_candidature comme identifiant unique principal
ALTER TABLE "Candidatures"
  ADD COLUMN id_candidature uuid PRIMARY KEY DEFAULT gen_random_uuid();

-- 2. Ajouter la colonne Statu pour le statut de la candidature
ALTER TABLE "Candidatures"
  ADD COLUMN "Statu" text;

-- Remarque : tu pourras préciser les valeurs autorisées de "Statu" (par exemple "acceptée", "refusée", "en attente", etc.) plus tard si besoin avec une contrainte.
