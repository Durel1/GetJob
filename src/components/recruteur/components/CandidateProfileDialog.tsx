
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { CandidatureWithDetails } from "../types/candidature";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface CandidateProfileDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedProfile: CandidatureWithDetails | null;
}

export const CandidateProfileDialog = ({ 
  isOpen, 
  onOpenChange, 
  selectedProfile 
}: CandidateProfileDialogProps) => {
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
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto mx-4">
        <DialogHeader>
          <DialogTitle>Profil du candidat</DialogTitle>
          <DialogDescription>
            Informations détaillées sur le candidat
          </DialogDescription>
        </DialogHeader>
        
        {selectedProfile && (
          <div className="space-y-6 py-4">
            <div>
              <h3 className="text-lg font-semibold mb-3">Informations personnelles</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Nom</label>
                  <p className="text-sm">{selectedProfile.etudiants?.nom || "Non renseigné"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <p className="text-sm">{selectedProfile.etudiants?.email || "Non renseigné"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Téléphone</label>
                  <p className="text-sm">{selectedProfile.etudiants?.telephone || "Non renseigné"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Localisation</label>
                  <p className="text-sm">{selectedProfile.Profil_Etudiants?.Localisation || "Non renseignée"}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Formation</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Établissement</label>
                  <p className="text-sm">{selectedProfile.Profil_Etudiants?.Etablissement || "Non renseigné"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Niveau d'études</label>
                  <p className="text-sm">{selectedProfile.Profil_Etudiants?.Niveau_etudes || "Non renseigné"}</p>
                </div>
                <div className="col-span-1 sm:col-span-2">
                  <label className="text-sm font-medium text-muted-foreground">Domaine d'études</label>
                  <p className="text-sm">{selectedProfile.Profil_Etudiants?.Domaine_Etudes || "Non renseigné"}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Compétences et disponibilité</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Compétences</label>
                  <p className="text-sm whitespace-pre-line">{selectedProfile.Profil_Etudiants?.Competances || "Non renseignées"}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Disponibilité</label>
                  <p className="text-sm">{selectedProfile.Profil_Etudiants?.Disponibilité || "Non renseignée"}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Documents et liens</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">CV</label>
                  {selectedProfile.Profil_Etudiants?.CV ? (
                    <div>
                      <button
                        onClick={async () => {
                          const url = await getCVDownloadUrl(selectedProfile.Profil_Etudiants!.CV!);
                          if (url) {
                            const link = document.createElement('a');
                            link.href = url;
                            link.download = selectedProfile.Profil_Etudiants!.CV!;
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                          } else {
                            toast.error("Impossible de télécharger le CV");
                          }
                        }}
                        className="text-sm text-blue-600 hover:text-blue-800 underline bg-transparent border-none p-0 cursor-pointer"
                      >
                        Télécharger le CV
                      </button>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">Non renseigné</p>
                  )}
                </div>
                
                <div>
                  <label className="text-sm font-medium text-muted-foreground">GitHub</label>
                  {selectedProfile.Profil_Etudiants?.URL_GitHub ? (
                    <div>
                      <a
                        href={selectedProfile.Profil_Etudiants.URL_GitHub}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:text-blue-800 underline"
                      >
                        Voir le profil GitHub
                      </a>
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">Non renseigné</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
