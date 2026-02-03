
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useCustomSession } from "@/hooks/useCustomSession";
import { useEmailNotifications } from "@/hooks/useEmailNotifications";
import { toast } from "sonner";

export interface CandidatureDetails {
  id_candidature: string;
  Statu: string | null;
  created_at: string | null;
  offre_emploi: {
    id_offre_emploi: string;
    poste: string | null;
    description: string | null;
    type_contrat: string | null;
    Entreprises: {
      nom_entreprise: string;
    } | null;
  } | null;
  recruteurs: {
    nom: string;
    email: string;
    telephone: string | null;
  } | null;
}

// Type alias pour compatibilité avec les composants
export type Candidature = CandidatureDetails & {
  nom_entreprise: string;
  poste: string;
  recruteur: {
    nom: string;
    email: string;
    telephone: string | null;
  } | null;
};

export const useCandidatures = () => {
  const { session } = useCustomSession();
  const [candidatures, setCandidatures] = useState<Candidature[]>([]);
  const [loading, setLoading] = useState(true);
  const { sendApplicationNotification } = useEmailNotifications();

  const fetchCandidatures = async () => {
    if (!session?.id) {
      setLoading(false);
      return;
    }

    try {
      const { data: candidaturesData, error } = await supabase
        .from("Candidatures")
        .select("*")
        .eq("id_etudiant", session.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Erreur lors de la récupération des candidatures:", error);
        setLoading(false);
        return;
      }

      if (!candidaturesData || candidaturesData.length === 0) {
        setCandidatures([]);
        setLoading(false);
        return;
      }

      const enrichedCandidatures: Candidature[] = [];

      for (const candidature of candidaturesData) {
        const { data: offreData, error: offreError } = await supabase
          .from("offre_emploi")
          .select(`
            id_offre_emploi,
            poste,
            description,
            type_contrat,
            id_recruteur,
            Entreprises!inner(nom_entreprise)
          `)
          .eq("id_offre_emploi", candidature.id_offre_emploi)
          .single();

        if (offreError) {
          console.error("Erreur lors de la récupération de l'offre:", offreError);
          continue;
        }

        const { data: recruteurData, error: recruteurError } = await supabase
          .from("recruteurs")
          .select("nom, email, telephone")
          .eq("id_recruteur", offreData.id_recruteur)
          .single();

        if (recruteurError) {
          console.error("Erreur lors de la récupération du recruteur:", recruteurError);
        }

        enrichedCandidatures.push({
          id_candidature: candidature.id_candidature,
          Statu: candidature.Statu,
          created_at: candidature.created_at,
          offre_emploi: offreData,
          recruteurs: recruteurData || null,
          // Propriétés aplaties pour compatibilité
          nom_entreprise: offreData.Entreprises?.nom_entreprise || "Entreprise inconnue",
          poste: offreData.poste || "Poste non spécifié",
          recruteur: recruteurData || null
        });
      }

      setCandidatures(enrichedCandidatures);
    } catch (error) {
      console.error("Erreur générale lors de la récupération des candidatures:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSupprimerCandidature = async (id_candidature: string) => {
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

  const postuler = async (offreId: string, offreDetails: { poste: string; entreprise: string; recruteurEmail: string }) => {
    if (!session?.id) {
      toast.error("Vous devez être connecté pour postuler");
      return false;
    }

    try {
      // Vérifier si l'étudiant a déjà postulé
      const { data: existingCandidature } = await supabase
        .from("Candidatures")
        .select("id_candidature")
        .eq("id_etudiant", session.id)
        .eq("id_offre_emploi", offreId)
        .maybeSingle();

      if (existingCandidature) {
        toast.error("Vous avez déjà postulé à cette offre");
        return false;
      }

      // Créer la candidature
      const { error: insertError } = await supabase
        .from("Candidatures")
        .insert({
          id_etudiant: session.id,
          id_offre_emploi: offreId,
          Statu: "En attente"
        });

      if (insertError) {
        console.error("Erreur lors de la création de la candidature:", insertError);
        toast.error("Erreur lors de la candidature");
        return false;
      }

      // Envoyer notification email au recruteur
      await sendApplicationNotification(
        crypto.randomUUID(), // ID temporaire pour la candidature
        session.nom,
        session.email,
        offreDetails.poste,
        offreDetails.entreprise,
        offreDetails.recruteurEmail
      );

      toast.success("Candidature envoyée avec succès !");
      fetchCandidatures(); // Rafraîchir la liste
      return true;
    } catch (error) {
      console.error("Erreur lors de la candidature:", error);
      toast.error("Erreur lors de la candidature");
      return false;
    }
  };

  useEffect(() => {
    fetchCandidatures();
  }, [session]);

  return {
    candidatures,
    loading,
    postuler,
    handleSupprimerCandidature,
    refetch: fetchCandidatures
  };
};
