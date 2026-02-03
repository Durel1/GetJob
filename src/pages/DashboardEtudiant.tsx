import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { MultiStepProfileForm } from "@/components/etudiant/MultiStepProfileForm";
import { EtudiantProfileView } from "@/components/etudiant/EtudiantProfileView";
import { EtudiantCandidatures } from "@/components/etudiant/EtudiantCandidatures";
import { AnnonceSearch } from "@/components/etudiant/AnnonceSearch";
import { DernieresAnnonces } from "@/components/etudiant/DernieresAnnonces";
import { useNavigate, useLocation } from "react-router-dom";
import { useCustomSession } from "@/hooks/useCustomSession";
import { supabase } from "@/integrations/supabase/client";
import { LogOut, User, Briefcase, Search, FileText } from "lucide-react";

const DashboardEtudiant = () => {
  // États pour gérer l'affichage du formulaire de profil et son état
  const [open, setOpen] = useState(false);
  const [profileExists, setProfileExists] = useState<boolean | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  
  // Hooks pour la navigation et la gestion de session
  const navigate = useNavigate();
  const location = useLocation();
  const { session, logoutSession } = useCustomSession();

  // Clé pour forcer le rechargement du composant de profil après mise à jour
  const [profileKey, setProfileKey] = useState(0);

  // Effet pour rediriger vers la page de connexion si l'utilisateur n'est pas connecté
  useEffect(() => {
    if (!session && location.pathname !== "/login") {
      navigate("/login", { replace: true });
    }
  }, [session, navigate, location.pathname]);

  // Effet pour vérifier l'existence du profil étudiant
  useEffect(() => {
    async function fetchProfile() {
      // Si pas de session, on arrête
      if (!session?.id) {
        setProfileExists(null);
        setLoadingProfile(false);
        return;
      }
      setLoadingProfile(true);

      // Requête pour récupérer le profil étudiant avec sélection exacte des colonnes
      const { data, error } = await supabase
        .from("Profil_Etudiants")
        .select('"Etablissement", "Domaine_Etudes", "Niveau_etudes", "Competances", "Localisation", "Disponibilité", "CV", "URL_GitHub"')
        .eq("id_etudiant", session.id)
        .maybeSingle();

      // Vérification de l'existence du profil
      if (error || !data || (data as any).Etablissement === undefined) {
        setProfileExists(false); // Profil n'existe pas
      } else {
        // Vérifie si au moins un champ est rempli
        setProfileExists(
          !!(
            (data as any).Etablissement ||
            (data as any).Domaine_Etudes ||
            (data as any).Niveau_etudes ||
            (data as any).Competances ||
            (data as any).Localisation ||
            (data as any).Disponibilité ||
            (data as any).CV ||
            (data as any).URL_GitHub
          )
        );
      }
      setLoadingProfile(false);
    }
    
    if (session?.id) {
      fetchProfile();
    }
  }, [session, open, profileKey]); // Se déclenche aussi quand le profil est mis à jour

  // Fonction de déconnexion
  const handleLogout = () => {
    logoutSession(); // Supprime la session
    navigate("/login", { replace: true }); // Redirige vers la page de connexion
  };

  // Affichage de chargement si la session n'est pas encore disponible
  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center bg-white p-8 rounded-xl shadow-lg">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Chargement…</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Enhanced Header */}
        <div className="relative bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-blue-100">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl opacity-5"></div>
          <div className="relative flex justify-between items-center">
            <div className="text-center flex-1">
              <div className="flex items-center justify-center mb-4">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-full shadow-lg">
                  <User className="w-8 h-8 text-white" />
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">
                Bienvenue {session.nom} !
              </h1>
              <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
                Gérez votre profil professionnel, suivez vos candidatures et découvrez de nouvelles opportunités
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="flex items-center gap-2 ml-4 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all duration-200 shadow-md"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Déconnexion</span>
            </Button>
          </div>
        </div>

        {/* Profile Section with Enhanced Design */}
        <div className="flex justify-center">
          <div className="w-full max-w-4xl">
            {loadingProfile ? (
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center border border-gray-100">
                <div className="animate-pulse flex items-center justify-center">
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-full shadow-lg">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <span className="ml-3 text-gray-600 text-lg">Chargement du profil…</span>
                </div>
              </div>
            ) : (
              <>
                {!profileExists && (
                  <div className="bg-white rounded-2xl shadow-lg p-8 text-center border border-gray-100 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-indigo-600/5"></div>
                    <div className="relative">
                      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 rounded-full w-16 h-16 mx-auto mb-6 shadow-lg">
                        <FileText className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-4">Créez votre profil professionnel</h3>
                      <p className="text-gray-600 mb-6 max-w-md mx-auto">
                        Complétez votre profil pour accéder à toutes les fonctionnalités et maximiser vos opportunités
                      </p>
                      <Button
                        onClick={() => setOpen(true)}
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                      >
                        Compléter mon profil
                      </Button>
                    </div>
                    <MultiStepProfileForm
                      open={open}
                      onClose={() => {
                        setOpen(false);
                        setProfileKey((k) => k + 1);
                      }}
                    />
                  </div>
                )}
                
                {profileExists && (
                  <div className="animate-fade-in">
                    <EtudiantProfileView
                      studentId={session.id}
                      onProfileUpdated={() => setProfileKey((k) => k + 1)}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Feature Sections with Enhanced Design */}
        {profileExists && (
          <div className="space-y-8 animate-fade-in">
            {/* Candidatures Section */}
            <div className="flex justify-center">
              <div className="w-full max-w-6xl">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-3 rounded-full shadow-lg">
                      <Briefcase className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 ml-4">Mes Candidatures</h2>
                  </div>
                  <EtudiantCandidatures />
                </div>
              </div>
            </div>

            {/* Search Section */}
            <div className="flex justify-center">
              <div className="w-full max-w-4xl">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-r from-purple-600 to-violet-600 p-3 rounded-full shadow-lg">
                      <Search className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 ml-4">Rechercher des Offres</h2>
                  </div>
                  <AnnonceSearch />
                </div>
              </div>
            </div>

            {/* Recent Offers Section */}
            <div className="flex justify-center">
              <div className="w-full max-w-6xl">
                <DernieresAnnonces />
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default DashboardEtudiant;
