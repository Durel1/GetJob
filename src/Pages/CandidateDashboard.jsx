import React from "react";
import "../styles/Pages_styles/CandidateDashboard.css"; 
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

export default function CandidateDashboard({ candidate, onLogout, onApply, onViewApplications }) {
  return (
    <div>
       <Navbar />

       <div className="dashboard-container">
      <h2>Bienvenue, {candidate.name} 👋</h2>
      
      <div className="info-block">
        <h3>Informations personnelles</h3>
        <p><strong>Email :</strong> {candidate.email}</p>
        <p><strong>Téléphone :</strong> {candidate.phone}</p>
      </div>

      <div className="info-block">
        <h3>Votre parcours</h3>
        <p><strong>École :</strong> {candidate.school}</p>
        <p><strong>Diplôme :</strong> {candidate.degree}</p>
      </div>

      <div className="button-group">
        <button onClick={onApply}>Candidater à une offre d'emploi</button>
        <button onClick={onViewApplications}>Mes candidatures</button>
        <button className="logout" onClick={onLogout}>Se déconnecter</button>
      </div>
    </div>
       
       <Footer />
    </div>
  );
}
