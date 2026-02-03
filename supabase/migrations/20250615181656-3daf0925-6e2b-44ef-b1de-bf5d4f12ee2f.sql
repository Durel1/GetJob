
-- 1. Supprimer toute contrainte étrangère existante utilisant "id" (préventif)
ALTER TABLE recruteurs DROP CONSTRAINT IF EXISTS recruteurs_pkey;

-- 2. Renommer la colonne 'id' en 'id_recruteur' dans la table 'recruteurs'
ALTER TABLE recruteurs RENAME COLUMN id TO id_recruteur;

-- 3. Recréer la clé primaire sur la nouvelle colonne
ALTER TABLE recruteurs ADD CONSTRAINT recruteurs_pkey PRIMARY KEY (id_recruteur);
