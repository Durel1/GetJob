import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useCustomSession } from "@/hooks/useCustomSession";

// Interface pour les données d'annonces enrichies
interface AnnonceEnrichie {
  id_offre_emploi: string;
  poste: string | null;
  type_contrat: string | null;
  description: string | null;
  nom_entreprise: string;
  competance: string | null;
  horaires_travail: string | null;
  niveau_etude: string | null;
}

// Listes des options pour les filtres de recherche
const niveaux = ["Bac", "Bac+2", "Bac+3", "Bac+5", "Doctorat"];
const horaires = ["Plein temps", "Temps partiel"];
const typesContrat = ["CDI", "CDD", "Stage", "Alternance", "Freelance"];

export function AnnonceSearch() {
  // État pour stocker les critères de recherche
  const [criteria, setCriteria] = useState({ 
    typeContrat: "", 
    horairesTravail: "", 
    niveau: "", 
    motCle: "" 
  });
  
  // État pour stocker les annonces filtrées
  const [filtered, setFiltered] = useState<AnnonceEnrichie[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedAnnonce, setSelectedAnnonce] = useState<AnnonceEnrichie | null>(null);
  const [isApplying, setIsApplying] = useState(false);
  
  const { session } = useCustomSession();

  // Fonction pour gérer les changements dans les champs de recherche
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setCriteria({ ...criteria, [e.target.name]: e.target.value });
  };

  // Fonction pour effectuer la recherche dans la base de données
  const handleSearch = async () => {
    if (!session?.id) {
      toast({
        title: "Erreur",
        description: "Vous devez être connecté pour effectuer une recherche.",
        variant: "destructive"
      });
      return;
    }

    try {
      setLoading(true);
      
      // D'abord, récupérer les IDs des offres auxquelles l'étudiant a déjà postulé
      const { data: candidatures, error: candidaturesError } = await supabase
        .from("Candidatures")
        .select("id_offre_emploi")
        .eq("id_etudiant", session.id);

      if (candidaturesError) {
        console.error("Erreur lors de la récupération des candidatures:", candidaturesError);
      }

      const candidatureIds = new Set(candidatures?.map(c => c.id_offre_emploi) || []);

      // Construire la requête avec les filtres
      let query = supabase
        .from("offre_emploi")
        .select(`
          id_offre_emploi,
          poste,
          type_contrat,
          description,
          competance,
          horaires_travail,
          niveau_etude,
          Entreprises!inner(nom_entreprise)
        `);

      // Appliquer les filtres
      if (criteria.typeContrat.trim()) {
        query = query.ilike('type_contrat', `%${criteria.typeContrat.trim()}%`);
      }
      
      if (criteria.horairesTravail) {
        query = query.eq('horaires_travail', criteria.horairesTravail);
      }
      
      if (criteria.niveau) {
        query = query.eq('niveau_etude', criteria.niveau);
      }

      // Filtre par mot-clé dans plusieurs champs
      if (criteria.motCle.trim()) {
        const keyword = criteria.motCle.trim();
        query = query.or(`poste.ilike.%${keyword}%,description.ilike.%${keyword}%,competance.ilike.%${keyword}%`);
      }

      const { data, error } = await query.order('id_offre_emploi', { ascending: false });

      if (error) {
        console.error("Erreur lors de la recherche:", error);
        toast({
          title: "Erreur",
          description: "Impossible d'effectuer la recherche.",
          variant: "destructive"
        });
        return;
      }

      // Transformation des données et filtrage des candidatures existantes
      const annoncesEnrichies: AnnonceEnrichie[] = (data || [])
        .filter((item: any) => !candidatureIds.has(item.id_offre_emploi))
        .map((item: any) => ({
          id_offre_emploi: item.id_offre_emploi,
          poste: item.poste,
          type_contrat: item.type_contrat,
          description: item.description,
          nom_entreprise: item.Entreprises?.nom_entreprise || "Entreprise inconnue",
          competance: item.competance,
          horaires_travail: item.horaires_travail,
          niveau_etude: item.niveau_etude
        }));

      setFiltered(annoncesEnrichies);
      
      if (annoncesEnrichies.length === 0) {
        toast({
          title: "Aucun résultat",
          description: "Aucune offre ne correspond à vos critères de recherche.",
          duration: 3000
        });
      }
    } catch (error) {
      console.error("Erreur lors de la recherche:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la recherche.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour postuler à une offre
  const handleApply = async () => {
    if (!selectedAnnonce || !session?.id) {
      toast({
        title: "Erreur",
        description: "Vous devez être connecté pour postuler.",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsApplying(true);

      // Vérifier si l'étudiant a déjà postulé à cette offre
      const { data: existingCandidature, error: checkError } = await supabase
        .from("Candidatures")
        .select("id_candidature")
        .eq("id_etudiant", session.id)
        .eq("id_offre_emploi", selectedAnnonce.id_offre_emploi)
        .maybeSingle();

      if (checkError) {
        console.error("Erreur lors de la vérification:", checkError);
        toast({
          title: "Erreur",
          description: "Impossible de vérifier vos candidatures existantes.",
          variant: "destructive"
        });
        return;
      }

      if (existingCandidature) {
        toast({
          title: "Candidature déjà envoyée",
          description: "Vous avez déjà postulé à cette offre.",
          variant: "destructive"
        });
        setSelectedAnnonce(null);
        return;
      }

      // Créer une nouvelle candidature
      const { error: insertError } = await supabase
        .from("Candidatures")
        .insert({
          id_etudiant: session.id,
          id_offre_emploi: selectedAnnonce.id_offre_emploi,
          Statu: "Attente de réponse"
        });

      if (insertError) {
        console.error("Erreur lors de l'insertion de la candidature:", insertError);
        toast({
          title: "Erreur",
          description: "Impossible d'envoyer votre candidature.",
          variant: "destructive"
        });
        return;
      }

      toast({
        title: "Candidature envoyée",
        description: "Votre candidature a été envoyée avec succès !",
        duration: 3000
      });
      
      // Supprimer l'offre de la liste après candidature réussie
      setFiltered(prev => prev.filter(a => a.id_offre_emploi !== selectedAnnonce.id_offre_emploi));
      setSelectedAnnonce(null);
    } catch (error) {
      console.error("Erreur lors de la candidature:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi de votre candidature.",
        variant: "destructive"
      });
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg text-center">Rechercher une annonce</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Section des filtres de recherche */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 mb-4">
          {/* Sélecteur type de contrat */}
          <select
            name="typeContrat"
            value={criteria.typeContrat}
            onChange={handleChange}
            className="border px-3 py-2 rounded-md w-full text-sm"
          >
            <option value="">Type de contrat</option>
            {typesContrat.map(type => <option key={type} value={type}>{type}</option>)}
          </select>
          
          {/* Sélecteur d'horaires de travail */}
          <select
            name="horairesTravail"
            value={criteria.horairesTravail}
            onChange={handleChange}
            className="border px-3 py-2 rounded-md w-full text-sm"
          >
            <option value="">Horaires de travail</option>
            {horaires.map(h => <option key={h} value={h}>{h}</option>)}
          </select>
          
          {/* Sélecteur de niveau d'étude */}
          <select
            name="niveau"
            value={criteria.niveau}
            onChange={handleChange}
            className="border px-3 py-2 rounded-md w-full text-sm"
          >
            <option value="">Niveau d'étude</option>
            {niveaux.map(n => <option key={n} value={n}>{n}</option>)}
          </select>
          
          {/* Champ de recherche par mot-clé */}
          <Input
            name="motCle"
            placeholder="Mot-clé"
            value={criteria.motCle}
            onChange={handleChange}
            className="w-full"
          />
          
          {/* Bouton de recherche */}
          <Button 
            onClick={handleSearch} 
            className="w-full"
            disabled={loading}
          >
            {loading ? "Recherche..." : "Rechercher"}
          </Button>
        </div>
        
        {/* Liste des résultats de recherche */}
        <div className="space-y-3">
          {filtered.length === 0 && !loading ? (
            <div className="text-center py-6 text-gray-500">
              Utilisez les filtres ci-dessus pour rechercher des annonces.
            </div>
          ) : (
            filtered.map(a => (
              <div key={a.id_offre_emploi} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">{a.poste || "Poste non spécifié"}</div>
                    <div className="text-sm text-gray-600">
                      chez {a.nom_entreprise} — {a.type_contrat || "Non spécifié"} / {a.niveau_etude || "Non spécifié"}
                    </div>
                    {a.horaires_travail && (
                      <div className="text-sm text-gray-500">
                        Horaires: {a.horaires_travail}
                      </div>
                    )}
                  </div>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="bg-green-600 hover:bg-green-700 text-white ml-4"
                    onClick={() => setSelectedAnnonce(a)}
                  >
                    Détail
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>

      {/* Dialog pour afficher les détails et postuler */}
      <Dialog open={!!selectedAnnonce} onOpenChange={(open) => {
        if (!open) setSelectedAnnonce(null);
      }}>
        <DialogContent className="max-w-2xl">
          {selectedAnnonce && (
            <>
              <DialogHeader>
                <DialogTitle>
                  {selectedAnnonce.poste || "Poste non spécifié"}
                </DialogTitle>
                <DialogDescription className="mb-2">
                  Entreprise : <span className="font-semibold">{selectedAnnonce.nom_entreprise}</span>
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div>
                  <strong>Type de contrat :</strong>
                  <div className="mt-1">{selectedAnnonce.type_contrat || "Non spécifié"}</div>
                </div>
                
                <div>
                  <strong>Description :</strong>
                  <div className="mt-1 whitespace-pre-line">
                    {selectedAnnonce.description || "Aucune description disponible"}
                  </div>
                </div>
                
                {selectedAnnonce.competance && (
                  <div>
                    <strong>Compétences requises :</strong>
                    <div className="mt-1">{selectedAnnonce.competance}</div>
                  </div>
                )}
                
                {selectedAnnonce.niveau_etude && (
                  <div>
                    <strong>Niveau d'études :</strong>
                    <div className="mt-1">{selectedAnnonce.niveau_etude}</div>
                  </div>
                )}
                
                {selectedAnnonce.horaires_travail && (
                  <div>
                    <strong>Horaires de travail :</strong>
                    <div className="mt-1">{selectedAnnonce.horaires_travail}</div>
                  </div>
                )}
              </div>
              
              <DialogFooter className="gap-2">
                <Button 
                  onClick={handleApply}
                  disabled={isApplying}
                >
                  {isApplying ? "Envoi en cours..." : "Postuler"}
                </Button>
                <DialogClose asChild>
                  <Button variant="outline">Fermer</Button>
                </DialogClose>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
}
