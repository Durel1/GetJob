
-- Ajoute un champ phone (téléphone) dans la table companies
ALTER TABLE public.companies
ADD COLUMN phone TEXT;

-- S’assurer que le nom de l’entreprise y figure (il y est déjà, colonne 'name').

-- Facultatif : si jamais tu veux enregistrer le nom de l’entreprise aussi dans profiles (ce n’est généralement pas nécessaire si ça existe déjà dans companies, il vaut mieux garder la logique d’une ligne pour chaque entité).
