
import { useState, FormEvent, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User2 } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useCustomSession } from "@/hooks/useCustomSession";
import ForgotPassword from "@/components/auth/ForgotPassword";

function hashPassword(password: string) {
  return btoa(password);
}

const Login = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { session, loginSession } = useCustomSession();

  useEffect(() => {
    if (session) {
      if (session.userType === "etudiant" && location.pathname !== "/dashboard-etudiant") {
        navigate("/dashboard-etudiant", { replace: true });
      }
      else if (session.userType === "recruteur" && location.pathname !== "/dashboard-recruteur") {
        navigate("/dashboard-recruteur", { replace: true });
      }
    }
  }, [session, navigate, location.pathname]);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (!email || !pwd) {
      setError("Veuillez renseigner tous les champs !");
      return;
    }
    // Cherche dans "etudiants"
    const { data: etud } = await supabase
      .from("etudiants")
      .select("id_etudiant, nom, email, mot_de_passe")
      .eq("email", email)
      .maybeSingle();

    if (etud && etud.mot_de_passe === hashPassword(pwd)) {
      loginSession({
        id: etud.id_etudiant,
        nom: etud.nom,
        email: etud.email,
        userType: "etudiant",
      });
      return;
    }

    // Cherche dans "recruteurs" (corrigé : colonne devient id_recruteur)
    const { data: recru } = await supabase
      .from("recruteurs")
      .select("id_recruteur, nom, email, mot_de_passe")
      .eq("email", email)
      .maybeSingle();

    if (recru && recru.mot_de_passe === hashPassword(pwd)) {
      loginSession({
        id: recru.id_recruteur,
        nom: recru.nom,
        email: recru.email,
        userType: "recruteur",
      });
      return;
    }

    setError("Email ou mot de passe incorrect.");
  }

  if (showForgotPassword) {
    return (
      <main className="flex items-center justify-center min-h-[83vh] bg-background">
        <ForgotPassword onBackToLogin={() => setShowForgotPassword(false)} />
      </main>
    );
  }

  return (
    <main className="flex items-center justify-center min-h-[83vh] bg-background">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white border border-blue-100 rounded-2xl shadow-xl px-8 py-10 flex flex-col items-center"
        style={{boxShadow: "0 2px 32px 0 #e0e5f9"}}
      >
        <div className="w-16 h-16 flex items-center justify-center rounded-xl bg-blue-900 mb-3">
          <User2 className="w-9 h-9 text-white" />
        </div>
        <h1 className="text-2xl font-bold mb-1 text-blue-950">Get<span className="text-blue-800">Job</span></h1>
        <div className="text-gray-500 mb-6 text-center text-base">Connectez-vous à votre espace</div>
        <div className="w-full flex flex-col gap-2 mb-5">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1 text-blue-900">Email</label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="votre@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-blue-50 border-2 border-blue-100 focus:border-blue-300"
              required
            />
          </div>
          <div className="relative">
            <label htmlFor="pwd" className="block text-sm font-medium mb-1 text-blue-900">
              Mot de passe
            </label>
            <Input
              id="pwd"
              type={showPwd ? "text" : "password"}
              autoComplete="current-password"
              placeholder="••••••••"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              className="bg-blue-50 border-2 border-blue-100 focus:border-blue-300 pr-12"
              required
            />
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowPwd((v) => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-0 text-blue-700 hover:text-blue-900 focus:outline-none bg-transparent"
              style={{height: '28px', width: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '12px'}}
              aria-label={showPwd ? "Masquer le mot de passe" : "Afficher le mot de passe"}
            >
              {showPwd ? (
                // œil simple
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <ellipse cx="11" cy="11" rx="8" ry="6" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  <circle cx="11" cy="11" r="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
                </svg>
              ) : (
                // œil barré
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                  <ellipse cx="11" cy="11" rx="8" ry="6" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  <circle cx="11" cy="11" r="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  <line x1="6" y1="6" x2="16" y2="16" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              )}
            </button>
          </div>
        </div>
        
        <div className="w-full text-right mb-4">
          <button
            type="button"
            onClick={() => setShowForgotPassword(true)}
            className="text-sm text-blue-600 hover:underline"
          >
            Mot de passe oublié ?
          </button>
        </div>

        <Button
          type="submit"
          className="w-full text-lg font-semibold bg-blue-900 hover:bg-blue-800 py-3 rounded-lg mb-3"
        >
          Se connecter
        </Button>
        {error && (
          <div className="text-destructive font-medium text-center text-sm mb-2">{error}</div>
        )}
        <div className="w-full text-center mt-2 text-sm">
          Pas encore de compte ?{" "}
          <button
            type="button"
            onClick={() => {
              setError("");
              navigate('/register');
            }}
            className="font-medium text-blue-800 hover:underline transition"
          >
            S'inscrire
          </button>
        </div>
      </form>
    </main>
  );
};

export default Login;
