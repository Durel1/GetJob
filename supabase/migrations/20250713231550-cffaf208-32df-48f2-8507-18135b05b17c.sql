-- Modifier la colonne URL_CV en CV dans la table Profil_Etudiants
ALTER TABLE "Profil_Etudiants" 
RENAME COLUMN "URL_CV" TO "CV";

-- Créer le bucket de stockage pour les CVs
INSERT INTO storage.buckets (id, name, public) 
VALUES ('cvs', 'cvs', false);

-- Créer les politiques pour le bucket CVs
-- Permettre aux utilisateurs authentifiés de voir leurs propres CVs
CREATE POLICY "Utilisateurs peuvent voir leurs propres CVs" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'cvs' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Permettre aux utilisateurs authentifiés de télécharger leurs CVs
CREATE POLICY "Utilisateurs peuvent télécharger leurs CVs" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'cvs' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Permettre aux utilisateurs authentifiés de mettre à jour leurs CVs
CREATE POLICY "Utilisateurs peuvent mettre à jour leurs CVs" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'cvs' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Permettre aux utilisateurs authentifiés de supprimer leurs CVs
CREATE POLICY "Utilisateurs peuvent supprimer leurs CVs" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'cvs' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Permettre aux recruteurs de voir tous les CVs (pour consulter les profils)
CREATE POLICY "Recruteurs peuvent voir tous les CVs" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'cvs');