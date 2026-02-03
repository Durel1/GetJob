
import { CompanyManagement } from "../CompanyManagement";
import { JobOfferManagement } from "../JobOfferManagement";
import { JobApplicationsManagement } from "../JobApplicationsManagement";
import { Building2, Briefcase, Users } from "lucide-react";

interface CompanyStatusSectionProps {
  hasCompany: boolean | null;
  loadingCompany: boolean;
}

export const CompanyStatusSection = ({ hasCompany, loadingCompany }: CompanyStatusSectionProps) => {
  if (loadingCompany) {
    return (
      <div className="text-center py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md mx-auto border border-gray-100">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Vérification de votre entreprise...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-8">
      {/* Company Management Section */}
      <div className="w-full flex justify-center">
        <div className="w-full max-w-4xl">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center mb-6">
              <div className="bg-gradient-to-r from-orange-600 to-red-600 p-3 rounded-full shadow-lg">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 ml-4">Gestion de l'Entreprise</h2>
            </div>
            <CompanyManagement key={hasCompany ? 'with-company' : 'no-company'} />
          </div>
        </div>
      </div>
      
      {/* Conditional Sections */}
      {hasCompany && (
        <>
          {/* Job Offer Management */}
          <div className="w-full flex justify-center">
            <div className="w-full max-w-6xl">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-full shadow-lg">
                    <Briefcase className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 ml-4">Gestion des Offres d'Emploi</h2>
                </div>
                <JobOfferManagement />
              </div>
            </div>
          </div>
          
          {/* Job Applications Management */}
          <div className="w-full flex justify-center">
            <div className="w-full max-w-6xl">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
                <div className="flex items-center mb-6">
                  <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-3 rounded-full shadow-lg">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 ml-4">Candidatures Reçues</h2>
                </div>
                <JobApplicationsManagement />
              </div>
            </div>
          </div>
        </>
      )}

      {/* Info Message when no company */}
      {!hasCompany && (
        <div className="text-center py-12 px-4">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-gray-200 rounded-2xl p-8 max-w-lg mx-auto shadow-lg">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 rounded-full w-16 h-16 mx-auto mb-6 shadow-lg">
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-blue-800 mb-4">
              Créez votre entreprise
            </h3>
            <p className="text-blue-600 text-lg leading-relaxed">
              Pour publier des offres d'emploi et recevoir des candidatures, 
              vous devez d'abord créer votre entreprise dans la section ci-dessus.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
