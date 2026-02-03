
export type CandidatureWithDetails = {
  id_candidature: string;
  Statu: string | null;
  offre_emploi: {
    id_offre_emploi: string;
    poste: string | null;
    description: string | null;
    type_contrat: string | null;
    Entreprises: {
      nom_entreprise: string;
    } | null;
  } | null;
  etudiants: {
    id_etudiant: string;
    nom: string;
    email: string;
    telephone: string | null;
  } | null;
  Profil_Etudiants: {
    id_profil_etudiant: string;
    Competances: string | null;
    Disponibilité: string | null;
    Domaine_Etudes: string | null;
    Etablissement: string | null;
    Localisation: string | null;
    Niveau_etudes: string | null;
    CV: string | null;
    URL_GitHub: string | null;
  } | null;
};
