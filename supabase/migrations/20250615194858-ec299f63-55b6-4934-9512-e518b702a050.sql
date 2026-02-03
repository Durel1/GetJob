
-- Définir la valeur par défaut de "created_at" et "updated_at" sur now()
ALTER TABLE "Entreprises"
  ALTER COLUMN created_at SET DEFAULT now(),
  ALTER COLUMN updated_at SET DEFAULT now();

-- Créer ou remplacer le trigger pour mettre à jour "updated_at" à chaque modification
CREATE OR REPLACE FUNCTION set_entreprises_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_set_entreprises_updated_at ON "Entreprises";
CREATE TRIGGER trg_set_entreprises_updated_at
BEFORE UPDATE ON "Entreprises"
FOR EACH ROW
EXECUTE PROCEDURE set_entreprises_updated_at();
