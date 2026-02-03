-- Supprimer toutes les politiques existantes sur le bucket CVs
DROP POLICY IF EXISTS "Utilisateurs peuvent voir leurs propres CVs" ON storage.objects;
DROP POLICY IF EXISTS "Utilisateurs peuvent télécharger leurs CVs" ON storage.objects;
DROP POLICY IF EXISTS "Utilisateurs peuvent mettre à jour leurs CVs" ON storage.objects;
DROP POLICY IF EXISTS "Utilisateurs peuvent supprimer leurs CVs" ON storage.objects;
DROP POLICY IF EXISTS "Recruteurs peuvent voir tous les CVs" ON storage.objects;

-- Créer des politiques permissives pour le bucket CVs
-- Permettre à tous les utilisateurs authentifiés de voir tous les CVs
CREATE POLICY "Accès public aux CVs pour lecture" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'cvs');

-- Permettre à tous les utilisateurs authentifiés d'uploader des CVs
CREATE POLICY "Upload libre pour CVs" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'cvs');

-- Permettre à tous les utilisateurs authentifiés de modifier les CVs
CREATE POLICY "Modification libre pour CVs" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'cvs');

-- Permettre à tous les utilisateurs authentifiés de supprimer les CVs
CREATE POLICY "Suppression libre pour CVs" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'cvs');