
-- Autoriser toute action (lecture, écriture, suppression) sur les fichiers du bucket 'userfiles' (public pour démo)
create policy "Public access to userfiles"
on storage.objects
for all
using (bucket_id = 'userfiles');
