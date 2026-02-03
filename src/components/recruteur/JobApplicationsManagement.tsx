
import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useCandidatures } from "./hooks/useCandidatures";
import { ApplicationsTable } from "./components/ApplicationsTable";
import { CandidateProfileDialog } from "./components/CandidateProfileDialog";
import type { CandidatureWithDetails } from "./types/candidature";

export const JobApplicationsManagement = () => {
  const { candidatures, updateCandidatureStatus, deleteCandidature } = useCandidatures();
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<CandidatureWithDetails | null>(null);

  const handleViewProfile = (candidature: CandidatureWithDetails) => {
    setSelectedProfile(candidature);
    setIsProfileDialogOpen(true);
  };

  return (
    <div className="w-full max-w-7xl mx-auto mb-8 px-4">
      <h2 className="text-xl sm:text-2xl font-semibold mb-6 text-center sm:text-left">
        Les candidatures à mes offres d'emploi
      </h2>
      
      {candidatures.length === 0 ? (
        <Card className="w-full">
          <CardContent className="p-6">
            <p className="text-center text-muted-foreground">
              Aucune candidature reçue pour le moment.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-center sm:text-left">
              Candidatures reçues ({candidatures.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ApplicationsTable
              candidatures={candidatures}
              onViewProfile={handleViewProfile}
              onUpdateStatus={updateCandidatureStatus}
              onDelete={deleteCandidature}
            />
          </CardContent>
        </Card>
      )}

      <CandidateProfileDialog
        isOpen={isProfileDialogOpen}
        onOpenChange={setIsProfileDialogOpen}
        selectedProfile={selectedProfile}
      />
    </div>
  );
};
