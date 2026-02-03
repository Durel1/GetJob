
import { useState, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useEmailNotifications } from "@/hooks/useEmailNotifications";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";

interface ForgotPasswordProps {
  onBackToLogin: () => void;
}

type Step = 'email' | 'password' | 'success';

export default function ForgotPassword({ onBackToLogin }: ForgotPasswordProps) {
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userInfo, setUserInfo] = useState<{nom: string, type: 'etudiant' | 'recruteur'} | null>(null);
  const { sendPasswordReset } = useEmailNotifications();

  async function handleEmailSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    if (!email) {
      setError("Veuillez saisir votre adresse email");
      setLoading(false);
      return;
    }

    try {
      // Vérifier si l'email existe dans les étudiants
      const { data: etudiant } = await supabase
        .from("etudiants")
        .select("nom")
        .eq("email", email)
        .maybeSingle();

      // Vérifier si l'email existe dans les recruteurs
      const { data: recruteur } = await supabase
        .from("recruteurs")
        .select("nom")
        .eq("email", email)
        .maybeSingle();

      if (!etudiant && !recruteur) {
        setError("Aucun compte trouvé avec cette adresse email");
        setLoading(false);
        return;
      }

      setUserInfo({
        nom: etudiant?.nom || recruteur?.nom || "Utilisateur",
        type: etudiant ? 'etudiant' : 'recruteur'
      });
      setStep('password');
    } catch (error) {
      console.error("Erreur lors de la vérification de l'email:", error);
      setError("Une erreur s'est produite. Veuillez réessayer.");
    }

    setLoading(false);
  }

  async function handlePasswordSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!newPassword || !confirmPassword) {
      setError("Veuillez remplir tous les champs");
      setLoading(false);
      return;
    }

    if (newPassword.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères");
      setLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      setLoading(false);
      return;
    }

    try {
      // Générer un token de confirmation
      const confirmationToken = btoa(email + Date.now() + Math.random()).replace(/[^a-zA-Z0-9]/g, '');
      
      // Stocker temporairement le nouveau mot de passe avec le token
      // Dans une vraie application, vous stockeriez cela dans une table temporaire avec expiration
      const tempData = {
        email,
        newPassword: btoa(newPassword), // Hasher le mot de passe
        token: confirmationToken,
        expiresAt: new Date(Date.now() + 60 * 60 * 1000).toISOString(), // 1 heure
        userType: userInfo?.type
      };
      
      // Pour cet exemple, on stocke dans localStorage (en production, utilisez une table de base de données)
      localStorage.setItem(`password_reset_${confirmationToken}`, JSON.stringify(tempData));

      // Envoyer l'email de confirmation
      const emailSent = await sendPasswordConfirmation(
        email,
        userInfo?.nom || "Utilisateur",
        confirmationToken
      );
      
      if (emailSent) {
        setStep('success');
      }
    } catch (error) {
      console.error("Erreur lors de la génération du token:", error);
      setError("Une erreur s'est produite. Veuillez réessayer.");
    }

    setLoading(false);
  }

  const sendPasswordConfirmation = async (
    email: string,
    nom: string,
    token: string
  ) => {
    try {
      const { data, error } = await supabase.functions.invoke('send-password-confirmation', {
        body: {
          email,
          nom,
          confirmationToken: token
        }
      });

      if (error) {
        console.error('Erreur envoi confirmation:', error);
        setError("Erreur lors de l'envoi de l'email de confirmation");
        return false;
      }

      console.log('Email de confirmation envoyé avec succès:', data);
      return true;
    } catch (error) {
      console.error('Erreur inattendue:', error);
      setError("Erreur lors de l'envoi de l'email de confirmation");
      return false;
    }
  };

  if (step === 'success') {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center text-green-600">Email de confirmation envoyé !</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-center">
          <p className="text-sm text-muted-foreground">
            Un email de confirmation a été envoyé à <strong>{email}</strong>
          </p>
          <p className="text-sm text-muted-foreground">
            Cliquez sur le lien dans l'email pour confirmer la réinitialisation de votre mot de passe.
          </p>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
            <p className="text-sm text-amber-800">
              ⏰ Ce lien expirera dans <strong>1 heure</strong>
            </p>
          </div>
          <Button 
            variant="outline" 
            onClick={onBackToLogin}
            className="w-full"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à la connexion
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (step === 'password') {
    return (
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Nouveau mot de passe</CardTitle>
          <p className="text-sm text-center text-muted-foreground">
            Bonjour <strong>{userInfo?.nom}</strong>, définissez votre nouveau mot de passe
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium mb-2">
                Nouveau mot de passe
              </label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium mb-2">
                Confirmer le mot de passe
              </label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Traitement..." : "Confirmer le nouveau mot de passe"}
            </Button>
            
            {error && (
              <div className="text-destructive text-sm text-center">{error}</div>
            )}
            
            <Button 
              type="button" 
              variant="ghost" 
              onClick={() => setStep('email')}
              className="w-full"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </Button>
          </form>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-center">Mot de passe oublié</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleEmailSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Adresse email
            </label>
            <Input
              id="email"
              type="email"
              placeholder="votre@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Vérification..." : "Continuer"}
          </Button>
          
          {error && (
            <div className="text-destructive text-sm text-center">{error}</div>
          )}
          
          <Button 
            type="button" 
            variant="ghost" 
            onClick={onBackToLogin}
            className="w-full"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Retour à la connexion
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
