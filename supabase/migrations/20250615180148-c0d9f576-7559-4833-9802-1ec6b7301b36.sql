
-- 1. Supprimer la contrainte de clé étrangère existante
ALTER TABLE "Profil_Etudiants" DROP CONSTRAINT IF EXISTS "Profil_Etudiants_id_Etudiant_fkey";

-- 2. Renommer la colonne 'id' en 'id_etudiant' dans la table 'etudiants'
ALTER TABLE etudiants RENAME COLUMN id TO id_etudiant;

-- 3. Supprimer l'ancienne clé primaire (si présente) puis la recréer sur la nouvelle colonne
ALTER TABLE etudiants DROP CONSTRAINT IF EXISTS etudiants_pkey;
ALTER TABLE etudiants ADD CONSTRAINT etudiants_pkey PRIMARY KEY (id_etudiant);

-- 4. Recréer la contrainte de clé étrangère (adaptée au nouveau nom de colonne)
ALTER TABLE "Profil_Etudiants"
ADD CONSTRAINT "Profil_Etudiants_id_Etudiant_fkey"
FOREIGN KEY (id_etudiant)
REFERENCES etudiants(id_etudiant)
ON DELETE CASCADE;
