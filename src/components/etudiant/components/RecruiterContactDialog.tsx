
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Candidature } from "../hooks/useCandidatures";

interface RecruiterContactDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  recruiter: Candidature['recruteur'] | null;
}

export const RecruiterContactDialog = ({ isOpen, onOpenChange, recruiter }: RecruiterContactDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Informations du recruteur</DialogTitle>
        </DialogHeader>
        {recruiter && (
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-600">Nom</p>
              <p className="text-base">{recruiter.nom}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Email</p>
              <p className="text-base">{recruiter.email}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Téléphone</p>
              <p className="text-base">{recruiter.telephone || "Non disponible"}</p>
            </div>
            <div className="flex justify-end pt-4">
              <Button onClick={() => onOpenChange(false)}>
                Fermer
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
