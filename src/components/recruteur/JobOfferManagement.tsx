
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useCustomSession } from "@/hooks/useCustomSession";
import { JobOfferForm } from "./components/JobOfferForm";
import { AnnonceList } from "./AnnonceList";

/**
 * Composant principal pour la gestion des offres d'emploi
 * Combine le formulaire de création et la liste des offres existantes
 * Gère la récupération de l'ID de l'entreprise du recruteur connecté
 */
export const JobOfferManagement = () => {
  // Récupération de la session utilisateur pour identifier le recruteur
  const { session } = useCustomSession();
  
  // État pour stocker l'ID de l'entreprise du recruteur connecté
  const [entrepriseId, setEntrepriseId] = useState<string | null>(null);
  
  // Clé pour forcer le rechargement de la liste des annonces après création
  const [refreshKey, setRefreshKey] = useState(0);

  // Effet pour récupérer l'ID de l'entreprise lors de la connexion
  useEffect(() => {
    const fetchEntrepriseId = async () => {
      if (!session?.id) return;

      // Requête pour récupérer l'entreprise associée au recruteur connecté
      const { data, error } = await supabase
        .from("Entreprises")
        .select("id_entreprise")
        .eq("id_recruteur", session.id)
        .maybeSingle();

      if (error) {
        console.error("Erreur lors de la récupération de l'entreprise:", error);
        return;
      }

      // Mise à jour de l'état avec l'ID de l'entreprise trouvée
      if (data) {
        setEntrepriseId(data.id_entreprise);
      }
    };

    fetchEntrepriseId();
  }, [session]);

  /**
   * Fonction appelée après la création réussie d'une offre
   * Incrémente la clé de rafraîchissement pour recharger la liste
   */
  const handleJobOfferCreated = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-8 px-4 space-y-8">
      {/* Formulaire de création d'offre d'emploi */}
      <JobOfferForm 
        entrepriseId={entrepriseId} 
        onSuccess={handleJobOfferCreated} 
      />

      {/* Liste des annonces existantes avec clé pour forcer le rechargement */}
      <AnnonceList key={refreshKey} />
    </div>
  );
};
