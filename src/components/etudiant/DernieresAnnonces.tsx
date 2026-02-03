import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { supabase } from "@/integrations/supabase/client";
import { useCustomSession } from "@/hooks/useCustomSession";
import { useHiddenOffers } from "./hooks/useHiddenOffers";
import { Briefcase, Building2, Clock, GraduationCap, Trash2 } from "lucide-react";

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

export function DernieresAnnonces() {
  const [annonces, setAnnonces] = useState<AnnonceEnrichie[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedAnnonce, setSelectedAnnonce] = useState<AnnonceEnrichie | null>(null);
  const [isApplying, setIsApplying] = useState(false);
  const isMobile = useIsMobile();
  const { session } = useCustomSession();
  const { hideOffer, isOfferHidden, loading: hiddenOffersLoading } = useHiddenOffers();

  // Fonction pour récupérer les annonces depuis la base de données
  const fetchAnnonces = async () => {
    try {
      setLoading(true);
      
      if (!session?.id) {
        setAnnonces([]);
        setLoading(false);
        return;
      }

      // D'abord, récupérer les IDs des offres auxquelles l'étudiant a déjà postulé
      const { data: candidatures, error: candidaturesError } = await supabase
        .from("Candidatures")
        .select("id_offre_emploi")
        .eq("id_etudiant", session.id);

      if (candidaturesError) {
        console.error("Erreur lors de la récupération des candidatures:", candidaturesError);
      }

      const candidatureIds = new Set(candidatures?.map(c => c.id_offre_emploi) || []);
      
      // Requête pour récupérer les offres d'emploi avec les informations des entreprises
      const { data, error } = await supabase
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
        `)
        .order('id_offre_emploi', { ascending: false })
        .limit(20);

      if (error) {
        console.error("Erreur lors de la récupération des annonces:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les annonces.",
          variant: "destructive"
        });
        return;
      }

      // Transformation des données pour correspondre à notre interface et filtrage
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

      setAnnonces(annoncesEnrichies);
    } catch (error) {
      console.error("Erreur lors de la récupération des annonces:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors du chargement.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Charger les annonces au montage du composant et quand les offres cachées sont chargées
  useEffect(() => {
    if (!hiddenOffersLoading) {
      fetchAnnonces();
    }
  }, [session, hiddenOffersLoading]);

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
      
      // Supprimer l'offre du tableau après candidature réussie
      setAnnonces(prev => prev.filter(a => a.id_offre_emploi !== selectedAnnonce.id_offre_emploi));
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

  // Fonction pour supprimer définitivement une offre du tableau
  const handleRemoveFromTable = () => {
    if (!selectedAnnonce) return;
    
    // Cacher l'offre de manière persistante
    hideOffer(selectedAnnonce.id_offre_emploi);
    
    // Supprimer l'offre du tableau local
    setAnnonces(prev => prev.filter(a => a.id_offre_emploi !== selectedAnnonce.id_offre_emploi));
    
    toast({
      title: "Offre supprimée",
      description: "L'offre a été supprimée définitivement du tableau.",
      duration: 2000
    });
    
    setSelectedAnnonce(null);
  };

  // Filtrer les annonces cachées et supprimées
  const visibleAnnonces = annonces.filter(annonce => !isOfferHidden(annonce.id_offre_emploi));

  if (loading || hiddenOffersLoading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="flex items-center mb-6">
          <div className="bg-gradient-to-r from-orange-600 to-red-600 p-3 rounded-full shadow-lg">
            <Briefcase className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 ml-4">Dernières Annonces</h2>
        </div>
        <div className="flex items-center justify-center p-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mr-3"></div>
          <span className="text-gray-600 text-lg">Chargement des annonces...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center mb-6">
        <div className="bg-gradient-to-r from-orange-600 to-red-600 p-3 rounded-full shadow-lg">
          <Briefcase className="w-6 h-6 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 ml-4">Dernières Annonces Publiées</h2>
      </div>
      
      {visibleAnnonces.length === 0 ? (
        <div className="text-center py-12 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl">
          <div className="bg-gray-200 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            <Briefcase className="w-8 h-8 text-gray-500" />
          </div>
          <p className="text-gray-500 text-lg">Aucune annonce disponible pour le moment.</p>
        </div>
      ) : (
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl overflow-hidden shadow-inner">
          <Table>
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-gray-100 to-gray-50 hover:from-gray-200 hover:to-gray-100">
                <TableHead className="font-semibold text-gray-700">
                  <div className="flex items-center">
                    <Building2 className="w-4 h-4 mr-2" />
                    Entreprise
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-gray-700">
                  <div className="flex items-center">
                    <Briefcase className="w-4 h-4 mr-2" />
                    Poste
                  </div>
                </TableHead>
                <TableHead className="hidden md:table-cell font-semibold text-gray-700">
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    Contrat
                  </div>
                </TableHead>
                <TableHead className="hidden lg:table-cell font-semibold text-gray-700">Description</TableHead>
                <TableHead className="font-semibold text-gray-700">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visibleAnnonces.map((annonce, index) => (
                <TableRow 
                  key={annonce.id_offre_emploi}
                  className="hover:bg-gradient-to-r hover:from-orange-50 hover:to-red-50 transition-all duration-200 border-b border-gray-100"
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center">
                      <div className="bg-gradient-to-r from-orange-100 to-red-100 p-2 rounded-lg mr-3">
                        <Building2 className="w-4 h-4 text-orange-600" />
                      </div>
                      {annonce.nom_entreprise}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="font-medium text-gray-800">
                      {annonce.poste || "Non spécifié"}
                    </span>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {annonce.type_contrat || "Non spécifié"}
                    </span>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell max-w-[200px]">
                    <p className="truncate text-gray-600">
                      {annonce.description || "Aucune description"}
                    </p>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-md hover:shadow-lg transition-all duration-200"
                      onClick={() => setSelectedAnnonce(annonce)}
                    >
                      Voir détails
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
      
      {/* Optimized Dialog with smaller size */}
      <Dialog open={!!selectedAnnonce} onOpenChange={(open) => {
        if (!open) setSelectedAnnonce(null);
      }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-xl">
          {selectedAnnonce && (
            <>
              <DialogHeader className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-t-xl -m-6 mb-4">
                <div className="flex items-center mb-3">
                  <div className="bg-gradient-to-r from-orange-600 to-red-600 p-2 rounded-full shadow-lg">
                    <Briefcase className="w-5 h-5 text-white" />
                  </div>
                  <div className="ml-3">
                    <DialogTitle className="text-xl font-bold text-gray-800">
                      {selectedAnnonce.poste || "Poste non spécifié"}
                    </DialogTitle>
                    <DialogDescription className="text-base font-medium text-orange-600 flex items-center mt-1">
                      <Building2 className="w-4 h-4 mr-1" />
                      {selectedAnnonce.nom_entreprise}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              
              <div className="space-y-4">
                {/* Contract Type */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3 rounded-lg">
                  <div className="flex items-center mb-1">
                    <Clock className="w-4 h-4 text-blue-600 mr-2" />
                    <strong className="text-blue-800 text-sm">Type de contrat</strong>
                  </div>
                  <div className="text-gray-700 text-sm ml-6">
                    {selectedAnnonce.type_contrat || "Non spécifié"}
                  </div>
                </div>
                
                {/* Description */}
                <div className="bg-gradient-to-r from-gray-50 to-slate-50 p-3 rounded-lg">
                  <strong className="text-gray-800 block mb-2 text-sm">Description du poste</strong>
                  <div className="text-gray-700 text-sm leading-relaxed whitespace-pre-line max-h-32 overflow-y-auto">
                    {selectedAnnonce.description || "Aucune description disponible"}
                  </div>
                </div>
                
                {/* Skills */}
                {selectedAnnonce.competance && (
                  <div className="bg-gradient-to-r from-purple-50 to-violet-50 p-3 rounded-lg">
                    <strong className="text-purple-800 block mb-2 text-sm">Compétences requises</strong>
                    <div className="text-gray-700 text-sm">{selectedAnnonce.competance}</div>
                  </div>
                )}
                
                {/* Education Level */}
                {selectedAnnonce.niveau_etude && (
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-3 rounded-lg">
                    <div className="flex items-center mb-1">
                      <GraduationCap className="w-4 h-4 text-green-600 mr-2" />
                      <strong className="text-green-800 text-sm">Niveau d'études</strong>
                    </div>
                    <div className="text-gray-700 text-sm ml-6">{selectedAnnonce.niveau_etude}</div>
                  </div>
                )}
                
                {/* Working Hours */}
                {selectedAnnonce.horaires_travail && (
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-3 rounded-lg">
                    <strong className="text-orange-800 block mb-2 text-sm">Horaires de travail</strong>
                    <div className="text-gray-700 text-sm">{selectedAnnonce.horaires_travail}</div>
                  </div>
                )}
              </div>
              
              <DialogFooter className="gap-2 pt-4 flex-wrap">
                <Button 
                  onClick={handleApply}
                  disabled={isApplying}
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 text-sm px-4 py-2"
                >
                  {isApplying ? "Envoi en cours..." : "Postuler à cette offre"}
                </Button>
                <Button 
                  variant="outline"
                  onClick={handleRemoveFromTable}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 hover:border-red-300 transition-all duration-200 text-sm px-4 py-2"
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Supprimer du tableau
                </Button>
                <DialogClose asChild>
                  <Button variant="outline" className="transition-all duration-200 text-sm px-4 py-2">
                    Fermer
                  </Button>
                </DialogClose>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
