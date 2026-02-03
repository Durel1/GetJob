
import { Button } from "@/components/ui/button";
import { LogOut, Building2 } from "lucide-react";

interface DashboardHeaderProps {
  userName: string;
  onLogout: () => void;
}

export const DashboardHeader = ({ userName, onLogout }: DashboardHeaderProps) => {
  return (
    <>
      {/* Enhanced Logout Button */}
      <div className="absolute right-4 top-4 z-10">
        <Button
          variant="outline"
          size="sm"
          onClick={onLogout}
          className="flex items-center gap-2 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all duration-200 shadow-md bg-white"
        >
          <LogOut className="w-4 h-4" />
          <span className="hidden sm:inline">Déconnexion</span>
        </Button>
      </div>

      {/* Enhanced Welcome Header */}
      <div className="text-center mb-12 mt-20 relative">
        <div className="bg-white rounded-2xl shadow-lg p-8 border border-orange-100 max-w-4xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl opacity-5"></div>
          <div className="relative">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-to-r from-orange-600 to-red-600 p-4 rounded-full shadow-lg">
                <Building2 className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              Bienvenue {userName} !
            </h1>
            <p className="text-gray-600 text-lg sm:text-xl leading-relaxed max-w-3xl mx-auto">
              Gérez votre entreprise, publiez vos offres d'emploi et découvrez les meilleurs talents
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
