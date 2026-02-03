
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCustomSession } from "@/hooks/useCustomSession";
import { toast } from "sonner";
import CVStep from "./profileSteps/CVStep";

type Step =
  | "etablissement"
  | "domaine"
  | "niveau"
  | "competances"
  | "autres"
  | "cv"
  | "github"
  | "finish";

const stepsLabel: Record<Step, string> = {
  etablissement: "Établissement",
  domaine: "Domaine d'études",
  niveau: "Niveau d'études",
  competances: "Compétences",
  autres: "Autres infos",
  cv: "CV",
  github: "Profil GitHub",
  finish: "Terminer",
};

const domaineOptions = [
  "Achat",
  "Informatique et nouvelle technologie",
  "Juridique", 
  "Management",
  "Marketing",
  "Secrétariat et assistance",
  "Transport et logistique",
  "Autre"
];

const niveauOptions = [
  "Bac",
  "Bac +2",
  "Bac +3",
  "Bac +5",
  "Doctorat"
];

const disponibiliteOptions = [
  "Plein temps",
  "Temps partiel"
];

export const MultiStepProfileForm = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const { session } = useCustomSession();
  const [step, setStep] = useState<Step>("etablissement");
  const [form, setForm] = useState({
    Etablissement: "",
    Domaine_Etudes: "",
    Niveau_etudes: "",
    Competances: "",
    Localisation: "",
    Disponibilité: "",
    CV: "",
    URL_GitHub: "",
    autreDomaineEtudes: "", // Pour stocker le domaine personnalisé
  });

  const [submitted, setSubmitted] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setForm({ ...form, [name]: value });
  };

  const canProceedToNext = () => {
    switch (step) {
      case "etablissement":
        return form.Etablissement.trim() !== "";
      case "domaine":
        return form.Domaine_Etudes.trim() !== "" && 
               (form.Domaine_Etudes !== "Autre" || form.autreDomaineEtudes.trim() !== "");
      case "niveau":
        return form.Niveau_etudes.trim() !== "";
      case "competances":
        return form.Competances.trim() !== "";
      default:
        return true;
    }
  };

  const next = () => {
    if (!canProceedToNext()) {
      toast.error("Veuillez remplir tous les champs obligatoires avant de continuer.");
      return;
    }

    if (step === "etablissement") setStep("domaine");
    else if (step === "domaine") setStep("niveau");
    else if (step === "niveau") setStep("competances");
    else if (step === "competances") setStep("autres");
    else if (step === "autres") setStep("cv");
    else if (step === "cv") setStep("github");
    else if (step === "github") setStep("finish");
  };

  const prev = () => {
    if (step === "domaine") setStep("etablissement");
    else if (step === "niveau") setStep("domaine");
    else if (step === "competances") setStep("niveau");
    else if (step === "autres") setStep("competances");
    else if (step === "cv") setStep("autres");
    else if (step === "github") setStep("cv");
    else if (step === "finish") setStep("github");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.id) {
      toast.error("Session utilisateur introuvable (customSession).");
      return;
    }
    setUploading(true);

    try {
      const generatedId = crypto.randomUUID();

      // Si "Autre" est sélectionné pour le domaine, utiliser la valeur personnalisée
      const domaineEtudes = form.Domaine_Etudes === "Autre" ? form.autreDomaineEtudes : form.Domaine_Etudes;

      const { error: upsertError } = await supabase.from("Profil_Etudiants")
        .upsert({
          id_profil_etudiant: generatedId,
          id_etudiant: session.id,
          Etablissement: form.Etablissement,
          Domaine_Etudes: domaineEtudes,
          Niveau_etudes: form.Niveau_etudes,
          Competances: form.Competances,
          Localisation: form.Localisation.trim() || null,
          Disponibilité: form.Disponibilité.trim() || null,
          CV: form.CV.trim() || null,
          URL_GitHub: form.URL_GitHub.trim() || null,
        }, { onConflict: "id_etudiant" });

      if (upsertError) {
        toast.error(`Erreur d'enregistrement: ${upsertError.message}`);
        setUploading(false);
        return;
      }

      setUploading(false);
      setSubmitted(true);
      setTimeout(onClose, 1500);

    } catch (err: any) {
      setUploading(false);
      toast.error(`Erreur inattendue: ${String(err?.message || err)}`);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg animate-fade-in">
        <DialogHeader>
          <DialogTitle>{stepsLabel[step]}</DialogTitle>
        </DialogHeader>
        {!submitted ? (
          <form className="space-y-4" onSubmit={handleSubmit}>
            {step === "etablissement" && (
              <Input
                autoFocus
                placeholder="Votre établissement *"
                name="Etablissement"
                value={form.Etablissement}
                onChange={handleChange}
                required
              />
            )}
            
            {step === "domaine" && (
              <div className="space-y-4">
                <Select value={form.Domaine_Etudes} onValueChange={(value) => handleSelectChange("Domaine_Etudes", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez votre domaine d'études *" />
                  </SelectTrigger>
                  <SelectContent>
                    {domaineOptions.map((domaine) => (
                      <SelectItem key={domaine} value={domaine}>
                        {domaine}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                {form.Domaine_Etudes === "Autre" && (
                  <Input
                    placeholder="Précisez votre domaine d'études"
                    name="autreDomaineEtudes"
                    value={form.autreDomaineEtudes}
                    onChange={handleChange}
                    required
                  />
                )}
              </div>
            )}
            
            {step === "niveau" && (
              <Select value={form.Niveau_etudes} onValueChange={(value) => handleSelectChange("Niveau_etudes", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez votre niveau d'études *" />
                </SelectTrigger>
                <SelectContent>
                  {niveauOptions.map((niveau) => (
                    <SelectItem key={niveau} value={niveau}>
                      {niveau}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            
            {step === "competances" && (
              <Textarea
                placeholder="Décrivez vos compétences (ex : React, Python, gestion de projet...) *"
                name="Competances"
                value={form.Competances}
                onChange={handleChange}
                required
                rows={4}
                className="resize-none"
              />
            )}
            
            {step === "autres" && (
              <>
                <Input
                  placeholder="Votre localisation"
                  name="Localisation"
                  value={form.Localisation}
                  onChange={handleChange}
                />
                <Select value={form.Disponibilité} onValueChange={(value) => handleSelectChange("Disponibilité", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez votre disponibilité" />
                  </SelectTrigger>
                  <SelectContent>
                    {disponibiliteOptions.map((dispo) => (
                      <SelectItem key={dispo} value={dispo}>
                        {dispo}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </>
            )}
            
            {step === "cv" && (
              <CVStep
                value={form.CV}
                onChange={(fileName) => setForm({ ...form, CV: fileName })}
                userId={session?.id}
              />
            )}
            
            {step === "github" && (
              <Input
                type="url"
                name="URL_GitHub"
                value={form.URL_GitHub}
                onChange={handleChange}
                placeholder="https://github.com/mon-profil"
                pattern="https://.*"
                autoComplete="off"
              />
            )}
            
            {step === "finish" && (
              <div className="text-center font-medium text-green-600">
                Cliquez sur « Terminer » pour enregistrer votre profil étudiant.
              </div>
            )}
            
            <div className="flex justify-between mt-4 gap-4">
              {step !== "etablissement" && (
                <Button type="button" variant="secondary" onClick={prev}>
                  Précédent
                </Button>
              )}
              {step === "finish" ? (
                <Button type="submit" variant="default" disabled={uploading}>
                  {uploading ? "Enregistrement..." : "Terminer"}
                </Button>
              ) : (
                <Button 
                  type="button" 
                  onClick={next}
                  disabled={!canProceedToNext()}
                >
                  Suivant
                </Button>
              )}
            </div>
          </form>
        ) : (
          <div className="flex flex-col items-center py-8 gap-2">
            <div className="text-green-600 font-bold text-xl">Profil enregistré !</div>
            <div className="text-muted-foreground text-center">Votre profil étudiant a été mis à jour.</div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
