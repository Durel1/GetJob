
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "@/integrations/supabase/client";
import { useCustomSession } from "@/hooks/useCustomSession";
import { toast } from "sonner";

/**
 * Interface définissant la structure des données du formulaire d'offre d'emploi
 * Correspond aux champs requis pour créer une nouvelle offre
 */
interface JobOfferFormData {
  id_entreprise: string;
  poste: string;
  description: string;
  competance: string;
  niveau_etude: string;
  type_contrat: string;
  horaires_travail: string;
}

/**
 * Type définissant la structure d'une entreprise
 */
interface Entreprise {
  id_entreprise: string;
  nom_entreprise: string;
}

/**
 * Hook personnalisé pour gérer la logique du formulaire d'offre d'emploi
 * Encapsule la validation, la soumission et la gestion des états
 * 
 * @param onSuccess - Callback appelé après une création réussie
 * @returns Objet contenant les méthodes et états du formulaire
 */
export const useJobOfferForm = (
  entrepriseId: string | null,
  onSuccess: () => void
) => {
  // Récupération de la session pour identifier le recruteur
  const { session } = useCustomSession();
  
  // État pour gérer l'affichage du loading pendant la soumission
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // État pour stocker les entreprises du recruteur
  const [entreprises, setEntreprises] = useState<Entreprise[]>([]);
  
  // État pour gérer le chargement des entreprises
  const [isLoadingEntreprises, setIsLoadingEntreprises] = useState(false);

  // Configuration du formulaire avec react-hook-form
  // Définition des valeurs par défaut pour tous les champs
  const form = useForm<JobOfferFormData>({
    defaultValues: {
      id_entreprise: "",
      poste: "",
      description: "",
      competance: "",
      niveau_etude: "",
      type_contrat: "",
      horaires_travail: "",
    },
  });

  // Effet pour récupérer les entreprises du recruteur
  useEffect(() => {
    if (session?.id) {
      fetchEntreprises();
    }
  }, [session]);

  /**
   * Fonction pour récupérer les entreprises du recruteur depuis la base de données
   */
  const fetchEntreprises = async () => {
    if (!session?.id) return;

    setIsLoadingEntreprises(true);
    try {
      const { data, error } = await supabase
        .from("Entreprises")
        .select("id_entreprise, nom_entreprise")
        .eq("id_recruteur", session.id);

      if (error) {
        console.error("Erreur lors de la récupération des entreprises:", error);
        toast.error("Erreur lors du chargement des entreprises");
        return;
      }

      setEntreprises(data || []);
    } catch (error) {
      console.error("Erreur inattendue:", error);
      toast.error("Une erreur inattendue s'est produite");
    } finally {
      setIsLoadingEntreprises(false);
    }
  };

  /**
   * Fonction de soumission du formulaire
   * Valide les données et crée une nouvelle offre d'emploi dans la base de données
   * 
   * @param data - Données du formulaire validées par react-hook-form
   */
  const onSubmit = async (data: JobOfferFormData) => {
    // Vérification des prérequis : session utilisateur
    if (!session?.id) {
      toast.error("Erreur: Informations manquantes");
      return;
    }

    // Activation du loading pour désactiver le bouton de soumission
    setIsSubmitting(true);

    try {
      // Insertion de la nouvelle offre d'emploi dans la base de données
      const { error } = await supabase
        .from("offre_emploi")
        .insert({
          poste: data.poste,
          description: data.description,
          competance: data.competance,
          niveau_etude: data.niveau_etude,
          type_contrat: data.type_contrat,
          horaires_travail: data.horaires_travail,
          id_recruteur: session.id,
          id_entreprise: data.id_entreprise,
        });

      // Gestion des erreurs de base de données
      if (error) {
        console.error("Erreur lors de la création de l'offre:", error);
        toast.error("Erreur lors de la création de l'offre d'emploi");
        return;
      }

      // Succès : notification utilisateur et réinitialisation du formulaire
      toast.success("Offre d'emploi créée avec succès !");
      form.reset(); // Vide tous les champs du formulaire
      onSuccess(); // Appel du callback pour actualiser la liste des offres
    } catch (error) {
      // Gestion des erreurs inattendues
      console.error("Erreur inattendue:", error);
      toast.error("Une erreur inattendue s'est produite");
    } finally {
      // Désactivation du loading dans tous les cas
      setIsSubmitting(false);
    }
  };

  // Retour de l'objet contenant toutes les méthodes et états nécessaires
  return {
    form,
    isSubmitting,
    entreprises,
    isLoadingEntreprises,
    onSubmit,
  };
};
