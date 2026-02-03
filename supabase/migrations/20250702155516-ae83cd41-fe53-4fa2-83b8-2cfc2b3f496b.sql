
-- Ajouter created_at et updated_at à la table etudiants
ALTER TABLE etudiants
  ADD COLUMN created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT now();

-- Ajouter created_at et updated_at à la table recruteurs
ALTER TABLE recruteurs
  ADD COLUMN created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT now();

-- Ajouter created_at et updated_at à la table Profil_Etudiants
ALTER TABLE "Profil_Etudiants"
  ADD COLUMN created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT now();

-- Ajouter created_at et updated_at à la table offre_emploi
ALTER TABLE offre_emploi
  ADD COLUMN created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT now();

-- Ajouter created_at et updated_at à la table Candidatures
ALTER TABLE "Candidatures"
  ADD COLUMN created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT now();

-- Créer les fonctions de trigger pour chaque table
CREATE OR REPLACE FUNCTION set_etudiants_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION set_recruteurs_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION set_profil_etudiants_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION set_offre_emploi_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION set_candidatures_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Créer les triggers pour mettre à jour updated_at automatiquement
CREATE TRIGGER trg_set_etudiants_updated_at
BEFORE UPDATE ON etudiants
FOR EACH ROW
EXECUTE PROCEDURE set_etudiants_updated_at();

CREATE TRIGGER trg_set_recruteurs_updated_at
BEFORE UPDATE ON recruteurs
FOR EACH ROW
EXECUTE PROCEDURE set_recruteurs_updated_at();

CREATE TRIGGER trg_set_profil_etudiants_updated_at
BEFORE UPDATE ON "Profil_Etudiants"
FOR EACH ROW
EXECUTE PROCEDURE set_profil_etudiants_updated_at();

CREATE TRIGGER trg_set_offre_emploi_updated_at
BEFORE UPDATE ON offre_emploi
FOR EACH ROW
EXECUTE PROCEDURE set_offre_emploi_updated_at();

CREATE TRIGGER trg_set_candidatures_updated_at
BEFORE UPDATE ON "Candidatures"
FOR EACH ROW
EXECUTE PROCEDURE set_candidatures_updated_at();
