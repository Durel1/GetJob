
import { useState, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { useCustomSession } from "@/hooks/useCustomSession";

function hashPassword(password: string) {
  return btoa(password);
}

export default function RegisterRecruteur() {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [tel, setTel] = useState("");
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { session, logoutSession } = useCustomSession();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (!nom || !email || !tel || !pwd) {
      setError("Veuillez renseigner tous les champs !");
      return;
    }

    // Vérifie email unique (correction du select : id_recruteur)
    const { data: exists } = await supabase
      .from("recruteurs")
      .select("id_recruteur")
      .eq("email", email)
      .maybeSingle();
    if (exists) {
      setError("Un compte existe déjà avec cet email.");
      return;
    }
    const { error: insertError } = await supabase
      .from("recruteurs")
      .insert({
        nom,
        email,
        telephone: tel,
        mot_de_passe: hashPassword(pwd),
        // id_recruteur généré automatiquement
      });
    if (insertError) {
      setError("Erreur lors de l'inscription : " + insertError.message);
      return;
    }
    navigate("/login");
  }

  return (
    <main className="flex items-center justify-center min-h-[70vh] bg-background">
      <form onSubmit={handleSubmit} className="bg-card shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-primary text-center">Inscription Recruteur</h1>
        {session && (
          <div className="mb-4 w-full text-center">
            <span className="text-blue-900 font-medium">Vous êtes actuellement connecté comme <b>{session.nom}</b>.</span>
            <Button className="ml-2" size="sm" variant="outline" onClick={logoutSession}>
              Déconnexion
            </Button>
          </div>
        )}
        <div className="mb-4">
          <label htmlFor="nom" className="block font-medium mb-2">Nom</label>
          <Input id="nom" type="text" placeholder="Votre nom" value={nom} onChange={e => setNom(e.target.value)} required />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block font-medium mb-2">Email</label>
          <Input id="email" type="email" placeholder="email@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div className="mb-4">
          <label htmlFor="tel" className="block font-medium mb-2">Téléphone</label>
          <Input id="tel" type="tel" placeholder="Votre numéro" value={tel} onChange={e => setTel(e.target.value)} required />
        </div>
        {/* Champ Nom entreprise supprimé */}
        <div className="mb-6">
          <label htmlFor="pwd" className="block font-medium mb-2">Mot de passe</label>
          <Input id="pwd" type="password" placeholder="Votre mot de passe" value={pwd} onChange={e => setPwd(e.target.value)} required />
        </div>
        <Button type="submit" className="w-full mb-2">Créer un compte recruteur</Button>
        {error && <div className="text-destructive font-medium text-center text-sm">{error}</div>}
        <div className="w-full text-center mt-3 text-sm">
          Déjà inscrit ?{" "}
          <button type="button" onClick={() => navigate('/login')} className="font-medium text-blue-800 hover:underline transition">
            Se connecter
          </button>
        </div>
      </form>
    </main>
  );
}
