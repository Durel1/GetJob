
import { Input } from "@/components/ui/input";

/**
 * Interface définissant la structure des valeurs d'éducation
 * Regroupe tous les champs liés à la formation de l'étudiant
 */
type EducationValues = {
  Etablissement: string; // Nom de l'université ou école
  Dernier_diplome: string; // Titre du dernier diplôme obtenu
  anne_obtention: string; // Année d'obtention (format numérique)
  competence: string; // Liste des compétences acquises
};

/**
 * Interface des propriétés du composant EducationStep
 */
type Props = {
  values: EducationValues; // Objet contenant toutes les valeurs des champs éducation
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Fonction appelée pour chaque modification
};

/**
 * Composant pour l'étape de saisie des informations d'éducation
 * Étape complexe du formulaire multi-étapes gérant plusieurs champs liés à la formation
 * 
 * Champs gérés :
 * - Établissement : université, école ou organisme de formation
 * - Dernier diplôme : titre/nom du diplôme le plus récent
 * - Année d'obtention : année de fin d'études (avec validation numérique)
 * - Compétences : liste des compétences techniques et transversales
 * 
 * @param values - Objet contenant toutes les valeurs des champs éducation
 * @param onChange - Fonction de callback pour gérer les modifications
 * @returns JSX.Element - Fragment contenant tous les champs d'éducation
 */
export default function EducationStep({ values, onChange }: Props) {
  return (
    <>
      {/* Champ pour l'établissement d'enseignement */}
      <Input
        placeholder="Établissement" // Indication claire de ce qui est attendu
        name="Etablissement" // Nom correspondant à la propriété dans l'objet values
        value={values.Etablissement} // Valeur actuelle depuis l'objet values
        onChange={onChange} // Gestionnaire de changement unifié
        required // Champ obligatoire pour valider le parcours
        className="w-full mb-4" // Espacement et largeur
      />
      
      {/* Champ pour le dernier diplôme obtenu */}
      <Input
        placeholder="Dernier diplôme" // Ex: "Master en Informatique", "Licence Pro"
        name="Dernier_diplome" // Nom de la propriété dans values
        value={values.Dernier_diplome} // Valeur contrôlée
        onChange={onChange} // Gestionnaire unifié
        required // Obligatoire pour connaître le niveau d'études
        className="w-full mb-4"
      />
      
      {/* Champ pour l'année d'obtention avec validation numérique */}
      <Input
        placeholder="Année d'obtention" // Ex: "2023", "2024"
        name="anne_obtention" // Nom de la propriété (note: typo "anne" au lieu de "annee")
        value={values.anne_obtention} // Valeur contrôlée
        type="number" // Type numérique pour validation automatique et clavier numérique mobile
        min="1900" // Année minimum raisonnable (évite les erreurs de saisie)
        max={new Date().getFullYear() + 10} // Maximum : année actuelle + 10 (pour les études en cours)
        onChange={onChange} // Gestionnaire unifié
        required // Obligatoire pour dater le diplôme
        className="w-full mb-4"
      />
      
      {/* Champ pour les compétences techniques et transversales */}
      <Input
        placeholder="Compétences (ex : React, Python, Gestion de projet...)" // Exemples concrets
        name="competence" // Nom de la propriété dans values
        value={values.competence} // Valeur contrôlée
        onChange={onChange} // Gestionnaire unifié
        required // Obligatoire car crucial pour le matching avec les offres
        className="w-full" // Largeur complète, pas de marge car dernier champ
      />
    </>
  );
}
