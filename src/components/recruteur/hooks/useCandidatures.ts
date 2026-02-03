
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useCustomSession } from "@/hooks/useCustomSession";
import { useEmailNotifications } from "@/hooks/useEmailNotifications";
import { toast } from "sonner";
import type { CandidatureWithDetails } from "../types/candidature";

// Type guard pour vérifier si un objet est un profil étudiant valide
const isValidProfilEtudiant = (data: any): data is NonNullable<CandidatureWithDetails['Profil_Etudiants']> => {
  return data && 
         typeof data === 'object' && 
         typeof data.id_profil_etudiant === 'string' &&
         !('error' in data);
};

export const useCandidatures = () => {
  const { session } = useCustomSession();
  const [candidatures, setCandidatures] = useState<CandidatureWithDetails[]>([]);
  const { sendStatusUpdate } = useEmailNotifications();

  useEffect(() => {
    if (session?.id) {
      fetchCandidatures();
    }
  }, [session]);

  const fetchCandidatures = async () => {
    if (!session?.id) return;

    try {
      const { data: offresRecruteur, error: offresError } = await supabase
        .from("offre_emploi")
        .select("id_offre_emploi")
        .eq("id_recruteur", session.id);

      if (offresError) {
        console.error("Erreur lors de la récupération des offres:", offresError);
        return;
      }

      if (!offresRecruteur || offresRecruteur.length === 0) {
        setCandidatures([]);
        return;
      }

      const offreIds = offresRecruteur.map(offre => offre.id_offre_emploi);

      const { data: candidaturesData, error: candidaturesError } = await supabase
        .from("Candidatures")
        .select("*")
        .in("id_offre_emploi", offreIds);

      if (candidaturesError) {
        console.error("Erreur lors de la récupération des candidatures:", candidaturesError);
        return;
      }

      if (!candidaturesData || candidaturesData.length === 0) {
        setCandidatures([]);
        return;
      }

      const enrichedCandidatures: CandidatureWithDetails[] = [];

      for (const candidature of candidaturesData) {
        const { data: offreData, error: offreError } = await supabase
          .from("offre_emploi")
          .select(`
            id_offre_emploi,
            poste,
            description,
            type_contrat,
            Entreprises!inner(nom_entreprise)
          `)
          .eq("id_offre_emploi", candidature.id_offre_emploi)
          .single();

        if (offreError) {
          console.error("Erreur lors de la récupération de l'offre:", offreError);
          continue;
        }

        const { data: etudiantData, error: etudiantError } = await supabase
          .from("etudiants")
          .select("id_etudiant, nom, email, telephone")
          .eq("id_etudiant", candidature.id_etudiant)
          .single();

        if (etudiantError) {
          console.error("Erreur lors de la récupération de l'étudiant:", etudiantError);
        }

        const { data: profilData, error: profilError } = await supabase
          .from("Profil_Etudiants")
          .select(`
            id_profil_etudiant,
            Competances,
            Disponibilité,
            Domaine_Etudes,
            Etablissement,
            Localisation,
            Niveau_etudes,
            CV,
            URL_GitHub
          `)
          .eq("id_etudiant", candidature.id_etudiant)
          .maybeSingle();

        // Vérification robuste du profil avec type guard
        const validProfil = (!profilError && isValidProfilEtudiant(profilData)) ? profilData : null;

        enrichedCandidatures.push({
          id_candidature: candidature.id_candidature,
          Statu: candidature.Statu,
          offre_emploi: offreData,
          etudiants: etudiantData || null,
          Profil_Etudiants: validProfil
        });
      }

      setCandidatures(enrichedCandidatures);
    } catch (error) {
      console.error("Erreur générale:", error);
    }
  };

  const updateCandidatureStatus = async (id_candidature: string, newStatus: string) => {
    const { error } = await supabase
      .from("Candidatures")
      .update({ Statu: newStatus })
      .eq("id_candidature", id_candidature);

    if (error) {
      console.error("Erreur lors de la mise à jour du statut:", error);
      toast.error("Erreur lors de la mise à jour du statut");
      return;
    }

    // Trouver la candidature pour envoyer l'email
    const candidature = candidatures.find(c => c.id_candidature === id_candidature);
    if (candidature && candidature.etudiants && candidature.offre_emploi) {
      await sendStatusUpdate(
        candidature.etudiants.email,
        candidature.etudiants.nom,
        candidature.offre_emploi.poste || "Poste non spécifié",
        candidature.offre_emploi.Entreprises?.nom_entreprise || "Entreprise non spécifiée",
        newStatus,
        session?.nom || "Recruteur"
      );
    }

    toast.success("Statut de la candidature mis à jour");
    await fetchCandidatures();
  };

  const deleteCandidature = async (id_candidature: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette candidature ?")) {
      return;
    }

    const { error } = await supabase
      .from("Candidatures")
      .delete()
      .eq("id_candidature", id_candidature);

    if (error) {
      console.error("Erreur lors de la suppression:", error);
      toast.error("Erreur lors de la suppression de la candidature");
      return;
    }

    toast.success("Candidature supprimée avec succès");
    await fetchCandidatures();
  };

  return {
    candidatures,
    updateCandidatureStatus,
    deleteCandidature
  };
};
