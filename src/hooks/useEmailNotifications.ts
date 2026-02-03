
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const useEmailNotifications = () => {
  const sendApplicationNotification = async (
    candidatureId: string,
    etudiantNom: string,
    etudiantEmail: string,
    poste: string,
    entreprise: string,
    recruteurEmail: string
  ) => {
    try {
      const { data, error } = await supabase.functions.invoke('send-application-notification', {
        body: {
          candidatureId,
          etudiantNom,
          etudiantEmail,
          poste,
          entreprise,
          recruteurEmail
        }
      });

      if (error) {
        console.error('Erreur envoi notification:', error);
        toast.error("Erreur lors de l'envoi de la notification email");
        return false;
      }

      console.log('Notification envoyée avec succès:', data);
      return true;
    } catch (error) {
      console.error('Erreur inattendue:', error);
      toast.error("Erreur lors de l'envoi de la notification email");
      return false;
    }
  };

  const sendStatusUpdate = async (
    etudiantEmail: string,
    etudiantNom: string,
    poste: string,
    entreprise: string,
    nouveauStatut: string,
    recruteurNom: string
  ) => {
    try {
      const { data, error } = await supabase.functions.invoke('send-status-update', {
        body: {
          etudiantEmail,
          etudiantNom,
          poste,
          entreprise,
          nouveauStatut,
          recruteurNom
        }
      });

      if (error) {
        console.error('Erreur envoi mise à jour statut:', error);
        toast.error("Erreur lors de l'envoi de la notification de statut");
        return false;
      }

      console.log('Notification statut envoyée avec succès:', data);
      return true;
    } catch (error) {
      console.error('Erreur inattendue:', error);
      toast.error("Erreur lors de l'envoi de la notification de statut");
      return false;
    }
  };

  const sendPasswordReset = async (email: string, nom: string, resetToken: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('send-password-reset', {
        body: {
          email,
          nom,
          resetToken
        }
      });

      if (error) {
        console.error('Erreur envoi reset password:', error);
        toast.error("Erreur lors de l'envoi de l'email de réinitialisation");
        return false;
      }

      console.log('Email reset password envoyé avec succès:', data);
      toast.success("Email de réinitialisation envoyé avec succès");
      return true;
    } catch (error) {
      console.error('Erreur inattendue:', error);
      toast.error("Erreur lors de l'envoi de l'email de réinitialisation");
      return false;
    }
  };

  return {
    sendApplicationNotification,
    sendStatusUpdate,
    sendPasswordReset
  };
};
