
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead } from "@/components/ui/table";
import { useAnnonces } from "./hooks/useAnnonces";
import { AnnonceTableRow } from "./components/AnnonceTableRow";

/**
 * Interface des propriétés du composant AnnonceList
 */
interface AnnonceListProps {
  key?: number; // Clé pour forcer le rechargement des données
}

/**
 * Composant principal pour afficher la liste des annonces d'emploi
 * Utilise le hook useAnnonces pour la gestion des données
 * Affiche un tableau avec toutes les annonces du recruteur connecté
 * 
 * @param key - Clé pour déclencher un rechargement des données
 */
export function AnnonceList({ key }: AnnonceListProps) {
  // Utilisation du hook personnalisé pour gérer les annonces
  const { annonces, loading, updateAnnonce, deleteAnnonce } = useAnnonces(key);

  // Affichage du loading pendant le chargement des données
  if (loading) {
    return (
      <Card className="mb-6 w-full">
        <CardHeader>
          <CardTitle>Mes annonces</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">Chargement des annonces...</div>
        </CardContent>
      </Card>
    );
  }

  // Affichage d'un message si aucune annonce n'est trouvée
  if (annonces.length === 0) {
    return (
      <Card className="mb-6 w-full">
        <CardHeader>
          <CardTitle>Mes annonces</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4 text-muted-foreground">
            Aucune annonce publiée pour le moment. Créez votre première annonce ci-dessus !
          </div>
        </CardContent>
      </Card>
    );
  }

  // Affichage du tableau des annonces avec toutes les fonctionnalités
  return (
    <Card className="mb-6 w-full max-w-7xl mx-auto">
      <CardHeader>
        <CardTitle>Mes annonces ({annonces.length})</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {/* Conteneur avec défilement horizontal pour les petits écrans */}
        <div className="overflow-x-auto">
          <Table>
            {/* En-têtes du tableau */}
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[200px]">Poste</TableHead>
                <TableHead className="min-w-[300px]">Description</TableHead>
                <TableHead className="min-w-[250px]">Compétences</TableHead>
                <TableHead className="min-w-[150px]">Niveau d'études</TableHead>
                <TableHead className="min-w-[150px]">Type de contrat</TableHead>
                <TableHead className="min-w-[150px]">Horaires</TableHead>
                <TableHead className="min-w-[200px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            
            {/* Corps du tableau avec une ligne par annonce */}
            <TableBody>
              {annonces.map(annonce => (
                <AnnonceTableRow
                  key={annonce.id_offre_emploi}
                  annonce={annonce}
                  onUpdate={updateAnnonce}
                  onDelete={deleteAnnonce}
                />
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
