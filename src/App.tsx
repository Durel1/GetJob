
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import RegisterEtudiant from './pages/RegisterEtudiant';
import RegisterRecruteur from './pages/RegisterRecruteur';
import DashboardEtudiant from './pages/DashboardEtudiant';
import DashboardRecruteur from './pages/DashboardRecruteur';
import ConseilsCarriere from './pages/ConseilsCarriere';
import CentreAide from './pages/CentreAide';
import Contact from './pages/Contact';
import ConditionsUtilisation from './pages/ConditionsUtilisation';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { CustomSessionProvider } from './hooks/useCustomSession';
import { Toaster } from "@/components/ui/toaster"
import ConfirmPasswordReset from "./pages/ConfirmPasswordReset";

function App() {
  return (
    <BrowserRouter>
      <CustomSessionProvider>
        <div className="min-h-screen flex flex-col bg-background">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/register-etudiant" element={<RegisterEtudiant />} />
            <Route path="/register-recruteur" element={<RegisterRecruteur />} />
            <Route path="/dashboard-etudiant" element={<DashboardEtudiant />} />
            <Route path="/dashboard-recruteur" element={<DashboardRecruteur />} />
            <Route path="/confirm-password-reset" element={<ConfirmPasswordReset />} />
            <Route path="/conseils-carriere" element={<ConseilsCarriere />} />
            <Route path="/centre-aide" element={<CentreAide />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/conditions-utilisation" element={<ConditionsUtilisation />} />
          </Routes>
          <Footer />
        </div>
        <Toaster />
      </CustomSessionProvider>
    </BrowserRouter>
  );
}

export default App;
