
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/components/ui/table";
import { toast } from "@/hooks/use-toast";
import { useCandidatures } from "./hooks/useCandidatures";
import { CandidatureStatusBadge } from "./components/CandidatureStatusBadge";
import { CandidatureActions } from "./components/CandidatureActions";
import { RecruiterContactDialog } from "./components/RecruiterContactDialog";
import type { Candidature } from "./hooks/useCandidatures";

export function EtudiantCandidatures() {
  const { candidatures, loading, handleSupprimerCandidature } = useCandidatures();
  const [showRecruiterDialog, setShowRecruiterDialog] = useState(false);
  const [selectedRecruiter, setSelectedRecruiter] = useState<Candidature['recruteur'] | null>(null);

  const handleContactRecruteur = (candidature: Candidature) => {
    if (candidature.recruteur) {
      setSelectedRecruiter(candidature.recruteur);
      setShowRecruiterDialog(true);
    } else {
      toast({
        title: "Erreur",
        description: "Informations du recruteur non disponibles.",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="mb-6">
        <div className="flex items-center justify-center p-8">
          Chargement des candidatures...
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="mb-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom entreprise</TableHead>
              <TableHead>Poste</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          
          <TableBody>
            {candidatures.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-gray-400">
                  Aucune candidature pour le moment.
                </TableCell>
              </TableRow>
            ) : (
              candidatures.map((candidature) => (
                <TableRow key={candidature.id_candidature}>
                  <TableCell className="font-medium">
                    {candidature.nom_entreprise}
                  </TableCell>
                  
                  <TableCell>{candidature.poste}</TableCell>
                  
                  <TableCell>
                    <CandidatureStatusBadge status={candidature.Statu} />
                  </TableCell>
                  
                  <TableCell>
                    <CandidatureActions
                      candidature={candidature}
                      onDelete={handleSupprimerCandidature}
                      onContactRecruiter={handleContactRecruteur}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <RecruiterContactDialog
        isOpen={showRecruiterDialog}
        onOpenChange={setShowRecruiterDialog}
        recruiter={selectedRecruiter}
      />
    </>
  );
}
