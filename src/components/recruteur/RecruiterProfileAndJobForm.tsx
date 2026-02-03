
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";

const secteurs = [
  "Informatique",
  "Banque/Assurance",
  "Santé",
  "Bâtiment/Génie civil",
  "Commerce/Distribution",
  "Éducation",
  "Industrie",
  "Autre",
];

export const RecruiterProfileAndJobForm = () => {
  const [societe, setSociete] = useState({
    nom: "",
    secteur: "",
    logo: null as File | null,
  });
  const [annonce, setAnnonce] = useState({
    poste: "",
    description: "",
    criteres: "",
  });

  const handleSocieteChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setSociete({ ...societe, [e.target.name]: e.target.value });
  };
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSociete({ ...societe, logo: e.target.files?.[0] ?? null });
  };
  const handleAnnonceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setAnnonce({ ...annonce, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // simulation d'envoi !
    alert("Offre créée !");
  };

  return (
    <div className="max-w-2xl mx-auto py-8 space-y-8 animate-fade-in">
      <Card>
        <CardHeader>
          <CardTitle>Profil société</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="Nom de la société"
            name="nom"
            value={societe.nom}
            onChange={handleSocieteChange}
            required
          />
          <select
            name="secteur"
            className="block w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
            value={societe.secteur}
            onChange={handleSocieteChange}
            required
          >
            <option value="">Secteur d’activité</option>
            {secteurs.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
          <Input
            type="file"
            accept="image/png, image/jpeg"
            name="logo"
            onChange={handleLogoChange}
          />
        </CardContent>
      </Card>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Créer une annonce</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Poste à pourvoir"
              name="poste"
              value={annonce.poste}
              onChange={handleAnnonceChange}
              required
            />
            <Textarea
              placeholder="Description du poste"
              name="description"
              value={annonce.description}
              onChange={handleAnnonceChange}
              required
            />
            <Textarea
              placeholder="Critères de sélection (ex : Bac+3, 3 ans d'expérience...)"
              name="criteres"
              value={annonce.criteres}
              onChange={handleAnnonceChange}
              required
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" className="ml-auto">
              Publier l'annonce
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};
