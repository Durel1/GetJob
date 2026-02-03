import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCustomSession } from "@/hooks/useCustomSession";

export default function Register() {
  const navigate = useNavigate();
  const { session, logoutSession } = useCustomSession();

  return (
    <main className="flex items-center justify-center min-h-[80vh] bg-background">
      <div className="bg-card shadow-lg rounded-lg p-10 w-full max-w-lg flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-5 text-primary text-center">Inscription</h1>
        <p className="text-base mb-8 text-muted-foreground text-center">Choisissez votre type de compte&nbsp;:</p>
        {session && (
          <div className="mb-5 w-full text-center">
            <span className="text-blue-900 font-medium">Vous êtes actuellement connecté comme <b>{session.nom}</b>.</span>
            <Button className="ml-2" size="sm" variant="outline" onClick={logoutSession}>
              Déconnexion
            </Button>
          </div>
        )}
        <div className="flex flex-col gap-5 w-full">
          <Button
            className="w-full text-lg py-3"
            onClick={() => navigate("/register-etudiant")}
          >
            Je suis étudiant
          </Button>
          <Button
            className="w-full text-lg py-3"
            variant="outline"
            onClick={() => navigate("/register-recruteur")}
          >
            Je suis recruteur
          </Button>
        </div>
        <div className="mt-6 text-center text-sm">
          Déjà inscrit ?{" "}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="font-medium text-blue-800 hover:underline transition"
          >
            Se connecter
          </button>
        </div>
      </div>
    </main>
  );
}
