
import { Button } from "@/components/ui/button";
import { Trash2, Phone } from "lucide-react";
import type { Candidature } from "../hooks/useCandidatures";

interface CandidatureActionsProps {
  candidature: Candidature;
  onDelete: (id: string) => void;
  onContactRecruiter: (candidature: Candidature) => void;
}

export const CandidatureActions = ({ candidature, onDelete, onContactRecruiter }: CandidatureActionsProps) => {
  return (
    <div className="flex gap-2">
      {/* Bouton Supprimer - toujours affiché */}
      <Button 
        variant="destructive" 
        size="sm" 
        onClick={() => onDelete(candidature.id_candidature)}
        className="flex items-center gap-2"
      >
        <Trash2 className="w-4 h-4" />
        Supprimer
      </Button>
      
      {/* Bouton Contacter recruteur - seulement si accepté */}
      {candidature.Statu === "Accepté" && (
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => onContactRecruiter(candidature)}
          className="flex items-center gap-2"
        >
          <Phone className="w-4 h-4" />
          Contacter recruteur
        </Button>
      )}
    </div>
  );
};
