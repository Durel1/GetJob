
import { Input } from "@/components/ui/input";

/**
 * Interface définissant les propriétés attendues par le composant PersonalStep
 * Utilisée pour typer les props de manière stricte
 */
type Props = {
  value: string; // Valeur actuelle du champ nom (contrôlée par le composant parent)
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Fonction de callback appelée à chaque modification
};

/**
 * Composant pour l'étape de saisie des informations personnelles dans le formulaire multi-étapes
 * Première étape du processus de création de profil étudiant
 * 
 * Ce composant est un champ contrôlé (controlled component) :
 * - La valeur est gérée par le composant parent
 * - Les changements sont remontés via la fonction onChange
 * 
 * @param value - Valeur actuelle du nom de l'étudiant
 * @param onChange - Fonction appelée à chaque modification du champ
 * @returns JSX.Element - Champ de saisie pour le nom complet
 */
export default function PersonalStep({ value, onChange }: Props) {
  return (
    <Input
      autoFocus // Focus automatique sur ce champ dès l'affichage pour améliorer l'UX
      placeholder="Votre nom complet" // Indication claire de ce qui est attendu
      name="Nom_etudant" // Nom du champ utilisé pour l'identification dans le formulaire
      value={value} // Valeur contrôlée depuis le composant parent
      onChange={onChange} // Gestionnaire de changement remontant les modifications
      required // Validation HTML5 : champ obligatoire
      className="w-full" // Largeur complète du conteneur parent
    />
  );
}
