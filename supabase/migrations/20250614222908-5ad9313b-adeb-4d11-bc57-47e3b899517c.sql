
-- Renommer la colonne URL_Image en Github_profile dans student_profiles
ALTER TABLE student_profiles
RENAME COLUMN "URL_Image" TO "Github_profile";
