
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useCustomSession } from "@/hooks/useCustomSession";
import { toast } from "sonner";

/**
 * Interface définissant la structure d'une annonce d'emploi
 * Correspond aux champs de la table offre_emploi
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
 * Hook personnalisé pour gérer les opérations CRUD sur les annonces
 * Encapsule la logique de récupération, modification et suppression
 * 
 * @param refreshKey - Clé pour déclencher un rechargement des données
 * @returns Objet contenant les annonces et les fonctions de manipulation
 */
export const useAnnonces = (refreshKey?: number) => {
  // Récupération de la session pour identifier le recruteur
  const { session } = useCustomSession();
  
  // États pour gérer les annonces et l'état de chargement
  const [annonces, setAnnonces] = useState<Annonce[]>([]);
  const [loading, setLoading] = useState(true);

  /**
   * Fonction pour récupérer toutes les annonces du recruteur connecté
   * Appelée au montage du composant et lors des changements de refreshKey
   */
  const fetchAnnonces = async () => {
    if (!session?.id) {
      setLoading(false);
      return;
    }

    try {
      // Requête pour récupérer toutes les offres d'emploi du recruteur
      const { data, error } = await supabase
        .from("offre_emploi")
        .select("*")
        .eq("id_recruteur", session.id);

      if (error) {
        console.error("Erreur lors de la récupération des annonces:", error);
        toast.error("Erreur lors du chargement des annonces");
        return;
      }

      // Mise à jour de l'état avec les annonces récupérées
      setAnnonces(data || []);
    } catch (error) {
      console.error("Erreur inattendue:", error);
      toast.error("Une erreur inattendue s'est produite");
    } finally {
      setLoading(false);
    }
  };

  // Effet pour charger les annonces au montage et lors des changements
  useEffect(() => {
    fetchAnnonces();
  }, [session?.id, refreshKey]);

  /**
   * Fonction pour mettre à jour une annonce existante
   * 
   * @param id - Identifiant de l'annonce à modifier
   * @param updatedData - Nouvelles données à sauvegarder
   */
  const updateAnnonce = async (id: string, updatedData: Partial<Annonce>) => {
    try {
      // Mise à jour dans la base de données
      const { error } = await supabase
        .from("offre_emploi")
        .update(updatedData)
        .eq("id_offre_emploi", id);

      if (error) {
        console.error("Erreur lors de la mise à jour:", error);
        toast.error("Erreur lors de la sauvegarde");
        return false;
      }

      // Mise à jour de l'état local pour éviter un rechargement complet
      setAnnonces(annonces.map(a =>
        a.id_offre_emploi === id ? { ...a, ...updatedData } : a
      ));
      
      toast.success("Annonce mise à jour avec succès !");
      return true;
    } catch (error) {
      console.error("Erreur inattendue:", error);
      toast.error("Une erreur inattendue s'est produite");
      return false;
    }
  };

  /**
   * Fonction pour supprimer une annonce
   * 
   * @param id - Identifiant de l'annonce à supprimer
   */
  const deleteAnnonce = async (id: string) => {
    // Demande de confirmation avant suppression
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette annonce ?")) {
      return false;
    }

    try {
      // Suppression de la base de données
      const { error } = await supabase
        .from("offre_emploi")
        .delete()
        .eq("id_offre_emploi", id);

      if (error) {
        console.error("Erreur lors de la suppression:", error);
        toast.error("Erreur lors de la suppression");
        return false;
      }

      // Suppression de l'état local
      setAnnonces(annonces.filter(a => a.id_offre_emploi !== id));
      toast.success("Annonce supprimée avec succès !");
      return true;
    } catch (error) {
      console.error("Erreur inattendue:", error);
      toast.error("Une erreur inattendue s'est produite");
      return false;
    }
  };

  return {
    annonces,
    loading,
    updateAnnonce,
    deleteAnnonce,
    refetch: fetchAnnonces
  };
};
