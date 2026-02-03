
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCustomSession } from "@/hooks/useCustomSession";
import { DashboardHeader } from "@/components/recruteur/dashboard/DashboardHeader";
import { CompanyStatusSection } from "@/components/recruteur/dashboard/CompanyStatusSection";
import { useCompanyStatus } from "@/components/recruteur/dashboard/useCompanyStatus";

const DashboardRecruteur = () => {
  const { session, logoutSession } = useCustomSession();
  const navigate = useNavigate();
  const location = useLocation();
  const { hasCompany, loadingCompany } = useCompanyStatus();

  useEffect(() => {
    if (!session && location.pathname !== "/login") {
      navigate("/login", { replace: true });
    }
  }, [session, navigate, location.pathname]);

  const handleLogout = () => {
    logoutSession();
    navigate("/login", { replace: true });
  };

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-red-100">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg border border-orange-100">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Chargement…</p>
        </div>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 flex flex-col items-center px-4 sm:px-6 lg:px-8">
      <DashboardHeader userName={session.nom} onLogout={handleLogout} />

      <div className="w-full max-w-7xl mx-auto">
        <section className="w-full flex flex-col items-center space-y-8 sm:space-y-12">
          <CompanyStatusSection hasCompany={hasCompany} loadingCompany={loadingCompany} />
        </section>
      </div>
    </main>
  );
};

export default DashboardRecruteur;
