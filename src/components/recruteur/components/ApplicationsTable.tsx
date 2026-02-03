
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Eye, Check, X, Trash2 } from "lucide-react";
import type { CandidatureWithDetails } from "../types/candidature";
import { getStatusBadgeColor, getStatusText } from "../utils/statusUtils";

interface ApplicationsTableProps {
  candidatures: CandidatureWithDetails[];
  onViewProfile: (candidature: CandidatureWithDetails) => void;
  onUpdateStatus: (id_candidature: string, newStatus: string) => void;
  onDelete: (id_candidature: string) => void;
}

export const ApplicationsTable = ({
  candidatures,
  onViewProfile,
  onUpdateStatus,
  onDelete
}: ApplicationsTableProps) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-[200px]">Entreprise</TableHead>
            <TableHead className="min-w-[250px]">Poste</TableHead>
            <TableHead className="min-w-[250px]">Candidat</TableHead>
            <TableHead className="min-w-[150px]">Profil candidat</TableHead>
            <TableHead className="min-w-[120px]">Statut</TableHead>
            <TableHead className="min-w-[300px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        
        <TableBody>
          {candidatures.map((candidature) => (
            <TableRow key={candidature.id_candidature}>
              <TableCell className="font-medium min-w-[200px]">
                {candidature.offre_emploi?.Entreprises?.nom_entreprise || "Entreprise inconnue"}
              </TableCell>
              
              <TableCell className="min-w-[250px]">
                {candidature.offre_emploi?.poste || "Poste non spécifié"}
              </TableCell>
              
              <TableCell className="min-w-[250px]">
                <div className="flex flex-col">
                  <span className="font-medium">
                    {candidature.etudiants?.nom || "Nom inconnu"}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {candidature.etudiants?.email || "Email non disponible"}
                  </span>
                </div>
              </TableCell>
              
              <TableCell className="min-w-[150px]">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onViewProfile(candidature)}
                  className="flex items-center gap-2 w-full sm:w-auto"
                >
                  <Eye className="w-4 h-4" />
                  <span className="hidden sm:inline">Voir profil</span>
                  <span className="sm:hidden">Profil</span>
                </Button>
              </TableCell>
              
              <TableCell className="min-w-[120px]">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(candidature.Statu)}`}>
                  {getStatusText(candidature.Statu)}
                </span>
              </TableCell>
              
              <TableCell className="min-w-[300px]">
                <div className="flex flex-col sm:flex-row gap-2">
                  {candidature.Statu === "Attente de réponse" && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onUpdateStatus(candidature.id_candidature, "Accepté")}
                        className="flex items-center gap-1 text-green-600 hover:bg-green-50 hover:text-green-700 w-full sm:w-auto"
                      >
                        <Check className="w-3 h-3" />
                        <span className="hidden sm:inline">Accepter</span>
                        <span className="sm:hidden">✓</span>
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onUpdateStatus(candidature.id_candidature, "Refusé")}
                        className="flex items-center gap-1 text-red-600 hover:bg-red-50 hover:text-red-700 w-full sm:w-auto"
                      >
                        <X className="w-3 h-3" />
                        <span className="hidden sm:inline">Refuser</span>
                        <span className="sm:hidden">✗</span>
                      </Button>
                    </>
                  )}
                  
                  {(candidature.Statu === "Accepté" || candidature.Statu === "Refusé") && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDelete(candidature.id_candidature)}
                      className="flex items-center gap-1 text-red-600 hover:bg-red-50 hover:text-red-700 w-full sm:w-auto"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span className="hidden sm:inline">Supprimer</span>
                      <span className="sm:hidden">🗑</span>
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
