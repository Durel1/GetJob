
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useCustomSession } from "@/hooks/useCustomSession";

export const useHiddenOffers = () => {
  const { session } = useCustomSession();
  const [hiddenOffers, setHiddenOffers] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);

  // Charger les offres cachées depuis localStorage au démarrage
  useEffect(() => {
    if (session?.id) {
      const storageKey = `hidden_offers_${session.id}`;
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        try {
          const hiddenIds = JSON.parse(stored);
          setHiddenOffers(new Set(hiddenIds));
        } catch (error) {
          console.error("Erreur lors du chargement des offres cachées:", error);
        }
      }
    }
    setLoading(false);
  }, [session?.id]);

  // Fonction pour cacher une offre
  const hideOffer = (offerId: string) => {
    if (!session?.id) return;

    const newHiddenOffers = new Set(hiddenOffers);
    newHiddenOffers.add(offerId);
    setHiddenOffers(newHiddenOffers);

    // Sauvegarder dans localStorage
    const storageKey = `hidden_offers_${session.id}`;
    localStorage.setItem(storageKey, JSON.stringify(Array.from(newHiddenOffers)));
  };

  // Fonction pour vérifier si une offre est cachée
  const isOfferHidden = (offerId: string) => {
    return hiddenOffers.has(offerId);
  };

  return {
    hiddenOffers,
    hideOffer,
    isOfferHidden,
    loading
  };
};
