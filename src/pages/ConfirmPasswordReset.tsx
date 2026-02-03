
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle, XCircle, Clock } from "lucide-react";

function hashPassword(password: string) {
  return btoa(password);
}

const ConfirmPasswordReset = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<'loading' | 'success' | 'expired' | 'error'>('loading');
  const [message, setMessage] = useState("");
  
  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage("Token de confirmation manquant");
      return;
    }

    confirmPasswordReset();
  }, [token]);

  const confirmPasswordReset = async () => {
    try {
      // Récupérer les données temporaires du localStorage
      const tempDataJson = localStorage.getItem(`password_reset_${token}`);
      
      if (!tempDataJson) {
        setStatus('expired');
        setMessage("Le lien de confirmation a expiré ou n'est pas valide");
        return;
      }

      const tempData = JSON.parse(tempDataJson);
      
      // Vérifier l'expiration
      if (new Date() > new Date(tempData.expiresAt)) {
        localStorage.removeItem(`password_reset_${token}`);
        setStatus('expired');
        setMessage("Le lien de confirmation a expiré");
        return;
      }

      // Mettre à jour le mot de passe dans la base de données
      const tableName = tempData.userType === 'etudiant' ? 'etudiants' : 'recruteurs';
      const { error } = await supabase
        .from(tableName)
        .update({ mot_de_passe: tempData.newPassword })
        .eq('email', tempData.email);

      if (error) {
        console.error("Erreur mise à jour mot de passe:", error);
        setStatus('error');
        setMessage("Erreur lors de la mise à jour du mot de passe");
        return;
      }

      // Nettoyer les données temporaires
      localStorage.removeItem(`password_reset_${token}`);
      
      setStatus('success');
      setMessage("Votre mot de passe a été réinitialisé avec succès !");
      
    } catch (error) {
      console.error("Erreur confirmation:", error);
      setStatus('error');
      setMessage("Une erreur s'est produite lors de la confirmation");
    }
  };

  const getIcon = () => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />;
      case 'expired':
        return <Clock className="w-12 h-12 text-orange-500 mx-auto" />;
      case 'error':
        return <XCircle className="w-12 h-12 text-red-500 mx-auto" />;
      default:
        return <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto" />;
    }
  };

  const getTitle = () => {
    switch (status) {
      case 'loading':
        return "Confirmation en cours...";
      case 'success':
        return "Réinitialisation réussie !";
      case 'expired':
        return "Lien expiré";
      case 'error':
        return "Erreur de confirmation";
    }
  };

  const getButtonText = () => {
    switch (status) {
      case 'success':
        return "Se connecter";
      default:
        return "Retour à l'accueil";
    }
  };

  return (
    <main className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="space-y-4">
            {getIcon()}
            <CardTitle className="text-center">{getTitle()}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <p className="text-sm text-muted-foreground">
            {message}
          </p>
          
          {status === 'success' && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-3">
              <p className="text-sm text-green-800">
                Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.
              </p>
            </div>
          )}
          
          {status === 'expired' && (
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
              <p className="text-sm text-orange-800">
                Veuillez refaire une demande de réinitialisation de mot de passe.
              </p>
            </div>
          )}
          
          <Button 
            onClick={() => navigate(status === 'success' ? '/login' : '/')}
            className="w-full"
          >
            {getButtonText()}
          </Button>
        </CardContent>
      </Card>
    </main>
  );
};

export default ConfirmPasswordReset;
