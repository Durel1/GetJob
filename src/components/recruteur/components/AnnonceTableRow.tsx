
import { useState } from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

/**
 * Interface définissant la structure d'une annonce
 */
type Annonce = {
  id_offre_emploi: string;
  poste: string;
  description: string;
  competance: string;
  niveau_etude: string;
  type_contrat: string;
  horaires_travail: string;
};

/**
 * Interface des propriétés du composant AnnonceTableRow
 */
interface AnnonceTableRowProps {
  annonce: Annonce; // Données de l'annonce à afficher
  onUpdate: (id: string, data: Partial<Annonce>) => Promise<boolean>; // Fonction de mise à jour
  onDelete: (id: string) => Promise<boolean>; // Fonction de suppression
}

/**
 * Composant représentant une ligne du tableau des annonces
 * Gère l'affichage et l'édition inline d'une annonce
 * 
 * @param annonce - Données de l'annonce
 * @param onUpdate - Callback pour mettre à jour l'annonce
 * @param onDelete - Callback pour supprimer l'annonce
 */
export const AnnonceTableRow = ({ annonce, onUpdate, onDelete }: AnnonceTableRowProps) => {
  // État pour gérer le mode édition de cette ligne
  const [isEditing, setIsEditing] = useState(false);
  
  // État pour stocker les données du formulaire d'édition
  const [formData, setFormData] = useState({
    poste: annonce.poste || "", 
    description: annonce.description || "", 
    competance: annonce.competance || "",
    niveau_etude: annonce.niveau_etude || "",
    type_contrat: annonce.type_contrat || "",
    horaires_travail: annonce.horaires_travail || ""
  });

  /**
   * Fonction pour activer le mode édition
   * Initialise le formulaire avec les données actuelles de l'annonce
   */
  const handleStartEdit = () => {
    setFormData({
      poste: annonce.poste || "", 
      description: annonce.description || "", 
      competance: annonce.competance || "",
      niveau_etude: annonce.niveau_etude || "",
      type_contrat: annonce.type_contrat || "",
      horaires_travail: annonce.horaires_travail || ""
    });
    setIsEditing(true);
  };

  /**
   * Gestionnaire de changement pour les champs du formulaire
   * Met à jour l'état local du formulaire
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  /**
   * Fonction pour sauvegarder les modifications
   * Appelle la fonction de mise à jour et sort du mode édition en cas de succès
   */
  const handleSave = async () => {
    const success = await onUpdate(annonce.id_offre_emploi, formData);
    if (success) {
      setIsEditing(false);
    }
  };

  /**
   * Fonction pour annuler l'édition
   * Remet les données du formulaire à leur état initial
   */
  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      poste: annonce.poste || "", 
      description: annonce.description || "", 
      competance: annonce.competance || "",
      niveau_etude: annonce.niveau_etude || "",
      type_contrat: annonce.type_contrat || "",
      horaires_travail: annonce.horaires_travail || ""
    });
  };

  /**
   * Fonction pour supprimer l'annonce
   * Appelle directement la fonction de suppression
   */
  const handleDelete = () => {
    onDelete(annonce.id_offre_emploi);
  };

  return (
    <TableRow>
      {/* Colonne Poste - champ texte simple */}
      <TableCell className="min-w-[200px]">
        {isEditing ? (
          <Input 
            name="poste" 
            value={formData.poste} 
            onChange={handleInputChange}
            placeholder="Titre du poste"
          />
        ) : (
          annonce.poste
        )}
      </TableCell>

      {/* Colonne Description - zone de texte multiligne */}
      <TableCell className="min-w-[300px]">
        {isEditing ? (
          <Textarea 
            name="description" 
            value={formData.description} 
            onChange={handleInputChange}
            className="min-h-[80px]"
            placeholder="Description du poste"
          />
        ) : (
          <div className="max-w-xs break-words" title={annonce.description}>
            {annonce.description}
          </div>
        )}
      </TableCell>

      {/* Colonne Compétences - zone de texte multiligne */}
      <TableCell className="min-w-[250px]">
        {isEditing ? (
          <Textarea 
            name="competance" 
            value={formData.competance} 
            onChange={handleInputChange}
            className="min-h-[80px]"
            placeholder="Compétences requises"
          />
        ) : (
          <div className="max-w-xs break-words" title={annonce.competance}>
            {annonce.competance}
          </div>
        )}
      </TableCell>

      {/* Colonne Niveau d'études - champ texte simple */}
      <TableCell className="min-w-[150px]">
        {isEditing ? (
          <Input 
            name="niveau_etude" 
            value={formData.niveau_etude} 
            onChange={handleInputChange}
            placeholder="Niveau requis"
          />
        ) : (
          annonce.niveau_etude
        )}
      </TableCell>

      {/* Colonne Type de contrat - champ texte simple */}
      <TableCell className="min-w-[150px]">
        {isEditing ? (
          <Input 
            name="type_contrat" 
            value={formData.type_contrat} 
            onChange={handleInputChange}
            placeholder="Type de contrat"
          />
        ) : (
          annonce.type_contrat
        )}
      </TableCell>

      {/* Colonne Horaires - champ texte simple */}
      <TableCell className="min-w-[150px]">
        {isEditing ? (
          <Input 
            name="horaires_travail" 
            value={formData.horaires_travail} 
            onChange={handleInputChange}
            placeholder="Horaires"
          />
        ) : (
          annonce.horaires_travail
        )}
      </TableCell>

      {/* Colonne Actions - boutons selon le mode (édition ou visualisation) */}
      <TableCell className="min-w-[200px]">
        <div className="flex gap-2">
          {isEditing ? (
            // Boutons en mode édition : Sauvegarder et Annuler
            <>
              <Button size="sm" onClick={handleSave}>
                Enregistrer
              </Button>
              <Button size="sm" variant="outline" onClick={handleCancel}>
                Annuler
              </Button>
            </>
          ) : (
            // Boutons en mode visualisation : Modifier et Supprimer
            <>
              <Button size="sm" variant="secondary" onClick={handleStartEdit}>
                Modifier
              </Button>
              <Button size="sm" variant="destructive" onClick={handleDelete}>
                Supprimer
              </Button>
            </>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
};
