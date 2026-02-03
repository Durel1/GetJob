
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useJobOfferForm } from "../hooks/useJobOfferForm";

/**
 * Interface définissant les propriétés du composant JobOfferForm
 */
interface JobOfferFormProps {
  entrepriseId: string | null; // Identifiant de l'entreprise (legacy, maintenant géré par le select)
  onSuccess: () => void; // Callback appelé après création réussie
}

/**
 * Composant de formulaire pour créer une nouvelle offre d'emploi
 * Utilise le hook useJobOfferForm pour la logique métier
 * 
 * @param entrepriseId - ID de l'entreprise (legacy)
 * @param onSuccess - Fonction appelée après création réussie
 */
export const JobOfferForm = ({ entrepriseId, onSuccess }: JobOfferFormProps) => {
  // Utilisation du hook personnalisé pour la gestion du formulaire
  const { form, isSubmitting, entreprises, isLoadingEntreprises, onSubmit } = useJobOfferForm(entrepriseId, onSuccess);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center sm:text-left">Publier une annonce</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Champ pour sélectionner l'entreprise */}
            <FormField
              control={form.control}
              name="id_entreprise"
              rules={{ required: "L'entreprise est requise" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sélectionner l'entreprise</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={
                          isLoadingEntreprises 
                            ? "Chargement des entreprises..." 
                            : entreprises.length === 0 
                              ? "Aucune entreprise disponible" 
                              : "Choisissez une entreprise"
                        } />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {entreprises.map((entreprise) => (
                        <SelectItem key={entreprise.id_entreprise} value={entreprise.id_entreprise}>
                          {entreprise.nom_entreprise}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                  {entreprises.length === 0 && !isLoadingEntreprises && (
                    <p className="text-sm text-muted-foreground">
                      Vous devez d'abord créer une entreprise pour publier une annonce.
                    </p>
                  )}
                </FormItem>
              )}
            />

            {/* Champ pour le titre du poste */}
            <FormField
              control={form.control}
              name="poste"
              rules={{ required: "Le poste est requis" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Poste à pourvoir</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Développeur Full Stack" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Champ pour la description détaillée du poste */}
            <FormField
              control={form.control}
              name="description"
              rules={{ required: "La description est requise" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description du poste</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Décrivez les missions, responsabilités et environnement de travail..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Champ pour lister les compétences requises */}
            <FormField
              control={form.control}
              name="competance"
              rules={{ required: "Les compétences sont requises" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Compétences requises</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Listez les compétences techniques et soft skills requis..."
                      className="min-h-[80px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Grille responsive pour les sélecteurs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Sélecteur pour le niveau d'études minimum requis */}
              <FormField
                control={form.control}
                name="niveau_etude"
                rules={{ required: "Le niveau d'études est requis" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Niveau d'études</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez le niveau" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Bac">Bac</SelectItem>
                        <SelectItem value="Bac+2">Bac+2</SelectItem>
                        <SelectItem value="Bac+3">Bac+3</SelectItem>
                        <SelectItem value="Bac+5">Bac+5</SelectItem>
                        <SelectItem value="Doctorat">Doctorat</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Sélecteur pour le type de contrat proposé */}
              <FormField
                control={form.control}
                name="type_contrat"
                rules={{ required: "Le type de contrat est requis" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type de contrat</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez le type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="CDI">CDI</SelectItem>
                        <SelectItem value="CDD">CDD</SelectItem>
                        <SelectItem value="Stage">Stage</SelectItem>
                        <SelectItem value="Alternance">Alternance</SelectItem>
                        <SelectItem value="Freelance">Freelance</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Sélecteur pour les horaires de travail */}
            <FormField
              control={form.control}
              name="horaires_travail"
              rules={{ required: "Les horaires de travail sont requis" }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Horaires de travail</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez les horaires" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Temps plein">Temps plein</SelectItem>
                      <SelectItem value="Temps partiel">Temps partiel</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Bouton de soumission avec gestion du loading */}
            <div className="flex justify-center sm:justify-end pt-4">
              <Button 
                type="submit" 
                disabled={isSubmitting || entreprises.length === 0}
                className="w-full sm:w-auto"
              >
                {isSubmitting ? "Publication..." : "Publier l'annonce"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
