
import { Input } from "@/components/ui/input";

/**
 * Interface définissant les propriétés du composant PhotoStep
 * Note : Le nom du composant suggère une photo, mais il s'agit en fait du profil GitHub
 */
type Props = {
  value: string; // URL actuelle du profil GitHub
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Callback pour les modifications
};

/**
 * Composant pour l'étape de saisie de l'URL du profil GitHub
 * Malgré son nom "PhotoStep", ce composant gère l'URL du profil GitHub de l'étudiant
 * 
 * Fonctionnalités :
 * - Validation automatique du format URL
 * - Pattern HTTPS obligatoire
 * - Champ obligatoire pour encourager les étudiants à partager leur code
 * - Placeholder spécifique à GitHub pour guider l'utilisateur
 * 
 * @param value - URL actuelle du profil GitHub
 * @param onChange - Fonction appelée lors des modifications
 * @returns JSX.Element - Champ de saisie pour l'URL GitHub
 */
export default function PhotoStep({ value, onChange }: Props) {
  return (
    <Input
      type="url" // Validation automatique du format URL
      name="Github_profile" // Nom du champ (attention : ne correspond pas exactement à la DB)
      value={value} // Valeur contrôlée
      onChange={onChange} // Gestionnaire de changement
      placeholder="https://github.com/mon-profil" // Exemple spécifique à GitHub
      required // Champ obligatoire pour encourager le partage du code
      pattern="https://.*" // Force l'utilisation d'HTTPS
      autoComplete="off" // Pas d'autocomplétion pour les URLs spécifiques
      className="w-full" // Largeur complète
    />
  );
}
