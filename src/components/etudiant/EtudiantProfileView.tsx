
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSession } from "@/hooks/useSession";
import CVStep from "./profileSteps/CVStep";
import { toast } from "sonner";

type Profile = {
  Etablissement: string | null;
  Domaine_Etudes: string | null;
  Niveau_etudes: string | null;
  Competances: string | null;
  Localisation: string | null;
  Disponibilité: string | null;
  CV: string | null;
  URL_GitHub: string | null;
};

const defaultProfile: Profile = {
  Etablissement: "",
  Domaine_Etudes: "",
  Niveau_etudes: "",
  Competances: "",
  Localisation: "",
  Disponibilité: "",
  CV: "",
  URL_GitHub: "",
};

export function EtudiantProfileView({ studentId, onProfileUpdated }: { studentId?: string, onProfileUpdated?: () => void }) {
  const { session } = useSession();
  const etudiantId = studentId ?? session?.user.id;
  const [profile, setProfile] = useState<Profile | null>(null);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [hasDbError, setHasDbError] = useState<string | null>(null);

  useEffect(() => {
    if (!etudiantId) return;
    async function fetchProfile() {
      const { data: profil, error } = await supabase
        .from("Profil_Etudiants")
        .select('"Etablissement", "Domaine_Etudes", "Niveau_etudes", "Competances", "Localisation", "Disponibilité", "CV", "URL_GitHub"')
        .eq("id_etudiant", etudiantId)
        .maybeSingle();

      if (error) {
        setHasDbError(error.message);
        setProfile(null);
      } else if (!profil) {
        setHasDbError(null);
        setProfile(null);
      } else {
        setHasDbError(null);
        setProfile({
          Etablissement: (profil as any)?.Etablissement ?? "",
          Domaine_Etudes: (profil as any)?.Domaine_Etudes ?? "",
          Niveau_etudes: (profil as any)?.Niveau_etudes ?? "",
          Competances: (profil as any)?.Competances ?? "",
          Localisation: (profil as any)?.Localisation ?? "",
          Disponibilité: (profil as any)?.Disponibilité ?? "",
          CV: (profil as any)?.CV ?? "",
          URL_GitHub: (profil as any)?.URL_GitHub ?? ""
        });
      }
      setLoading(false);
    }
    fetchProfile();
  }, [etudiantId, editing]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!profile) return;
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const getCVDownloadUrl = async (fileName: string) => {
    if (!fileName) {
      console.log('No filename provided');
      return null;
    }
    console.log('Attempting to download CV:', fileName);
    try {
      const { data, error } = await supabase.storage
        .from('cvs')
        .createSignedUrl(fileName, 3600);
      
      if (error) {
        console.error('Error creating signed URL:', error);
        toast.error(`Erreur lors de la création de l'URL: ${error.message}`);
        return null;
      }
      
      console.log('Signed URL created:', data?.signedUrl);
      return data?.signedUrl || null;
    } catch (error) {
      console.error('Error creating signed URL:', error);
      toast.error("Erreur lors de la création de l'URL de téléchargement");
      return null;
    }
  };

  const handleCVChange = (fileName: string) => {
    if (!profile) return;
    setProfile({ ...profile, CV: fileName });
  };

  const handleEdit = () => setEditing(true);

  const handleSave = async () => {
    if (!profile || !etudiantId) return;
    await supabase.from("Profil_Etudiants").update({
      Etablissement: profile.Etablissement,
      Domaine_Etudes: profile.Domaine_Etudes,
      Niveau_etudes: profile.Niveau_etudes,
      Competances: profile.Competances,
      Localisation: profile.Localisation,
      Disponibilité: profile.Disponibilité,
      CV: profile.CV,
      URL_GitHub: profile.URL_GitHub,
    }).eq("id_etudiant", etudiantId);

    setEditing(false);
    if (onProfileUpdated) onProfileUpdated();
  };

  if (loading) return <div>Chargement…</div>;
  if (hasDbError) return <div className="text-red-700 font-bold">{hasDbError}</div>;
  if (!profile) return <div>Profil introuvable.</div>;

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Mon profil</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {!editing ? (
          <>
            <div><b>Établissement&nbsp;:</b> {profile.Etablissement || <span className="text-gray-500 ml-1">Non renseigné</span>}</div>
            <div><b>Domaine d’études&nbsp;:</b> {profile.Domaine_Etudes || <span className="text-gray-500 ml-1">Non renseigné</span>}</div>
            <div><b>Niveau d’études&nbsp;:</b> {profile.Niveau_etudes || <span className="text-gray-500 ml-1">Non renseigné</span>}</div>
            <div><b>Compétences&nbsp;:</b> {profile.Competances || <span className="text-gray-500 ml-1">Non renseigné</span>}</div>
            <div><b>Localisation&nbsp;:</b> {profile.Localisation || <span className="text-gray-500 ml-1">Non renseigné</span>}</div>
            <div><b>Disponibilité&nbsp;:</b> {profile.Disponibilité || <span className="text-gray-500 ml-1">Non renseigné</span>}</div>
            <div>
              <b>CV&nbsp;:</b>
              {profile.CV
                ? <button 
                    onClick={async () => {
                      const url = await getCVDownloadUrl(profile.CV!);
                      if (url) {
                        const link = document.createElement('a');
                        link.href = url;
                        link.download = profile.CV!;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                      } else {
                        toast.error("Impossible de télécharger le CV");
                      }
                    }}
                    className="text-blue-700 underline ml-1 bg-transparent border-none p-0 cursor-pointer hover:text-blue-900"
                  >
                    Télécharger CV
                  </button>
                : <span className="text-gray-500 ml-1">Non importé</span>}
            </div>
            <div>
              <b>Profil GitHub&nbsp;:</b>
              {profile.URL_GitHub
                ? <a href={profile.URL_GitHub} target="_blank" rel="noopener noreferrer" className="text-blue-700 underline ml-1">Voir le profil</a>
                : <span className="text-gray-500 ml-1">Non renseigné</span>}
            </div>
          </>
        ) : (
          <form className="space-y-2" onSubmit={e => { e.preventDefault(); handleSave(); }}>
            <Input name="Etablissement" value={profile.Etablissement || ""} onChange={handleChange} placeholder="Établissement" />
            <Input name="Domaine_Etudes" value={profile.Domaine_Etudes || ""} onChange={handleChange} placeholder="Domaine d’études" />
            <Input name="Niveau_etudes" value={profile.Niveau_etudes || ""} onChange={handleChange} placeholder="Niveau d’études" />
            <Input name="Competances" value={profile.Competances || ""} onChange={handleChange} placeholder="Compétences" />
            <Input name="Localisation" value={profile.Localisation || ""} onChange={handleChange} placeholder="Localisation" />
            <Input name="Disponibilité" value={profile.Disponibilité || ""} onChange={handleChange} placeholder="Disponibilité" />
            <div>
              <label className="text-sm font-medium">CV</label>
              <CVStep
                value={profile.CV || ""}
                onChange={handleCVChange}
                userId={etudiantId}
              />
            </div>
            <Input name="URL_GitHub" value={profile.URL_GitHub || ""} onChange={handleChange} placeholder="https://github.com/..." />
            <Button type="submit" variant="default">Enregistrer</Button>
          </form>
        )}
      </CardContent>
      <CardFooter className="justify-end">
        {!editing ? (
          <Button onClick={handleEdit} variant="secondary">Modifier</Button>
        ) : null}
      </CardFooter>
    </Card>
  );
}
