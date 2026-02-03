
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useCustomSession } from "@/hooks/useCustomSession";

export const useCompanyStatus = () => {
  const { session } = useCustomSession();
  const [hasCompany, setHasCompany] = useState<boolean | null>(null);
  const [loadingCompany, setLoadingCompany] = useState(true);

  useEffect(() => {
    /**
     * Fonction asynchrone pour vérifier l'entreprise
     * Recherche une entreprise liée à l'ID du recruteur connecté
     */
    async function checkCompany() {
      // Si pas de session, on ne peut pas vérifier
      if (!session?.id) {
        setHasCompany(null);
        setLoadingCompany(false);
        return;
      }
      
      setLoadingCompany(true);
      
      try {
        // Requête pour chercher toutes les entreprises associées au recruteur
        const { data, error } = await supabase
          .from("Entreprises")
          .select("id_entreprise")
          .eq("id_recruteur", session.id);

        // Gestion des erreurs de requête
        if (error) {
          console.error("Erreur lors de la vérification de l'entreprise:", error);
          setHasCompany(false);
        } else {
          // Mise à jour de l'état selon l'existence de données
          // Vrai si au moins une entreprise existe
          setHasCompany(data && data.length > 0);
        }
      } catch (error) {
        console.error("Erreur inattendue lors de la vérification de l'entreprise:", error);
        setHasCompany(false);
      } finally {
        setLoadingCompany(false);
      }
    }
    
    // Lancement de la vérification seulement si on a un ID de session
    if (session?.id) {
      checkCompany();
    }
  }, [session]);

  /**
   * Fonction pour recharger l'état des entreprises
   * Appelée après ajout/suppression d'entreprise pour mettre à jour l'affichage
   * Évite un rechargement complet de la page
   */
  const handleCompanyChange = async () => {
    if (session?.id) {
      try {
        // Re-vérification de l'existence des entreprises
        const { data, error } = await supabase
          .from("Entreprises")
          .select("id_entreprise")
          .eq("id_recruteur", session.id);
          
        if (error) {
          console.error("Erreur lors du rechargement de l'entreprise:", error);
          setHasCompany(false);
        } else {
          setHasCompany(data && data.length > 0);
        }
      } catch (error) {
        console.error("Erreur inattendue lors du rechargement:", error);
        setHasCompany(false);
      }
    }
  };

  return {
    hasCompany,
    loadingCompany,
    handleCompanyChange
  };
};
