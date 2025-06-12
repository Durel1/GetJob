import React from "react";
import "../styles/Pages_styles/RecruiterDashboard.css";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

export default function RecruiterDashboard({ recruiter, onPublish, onViewOffers, onLogout }) {
  return (
    <div>
       <Navbar />

       <div className="dashboard-container">
      <h2>Bienvenue, {recruiter.recruiterName} 👋</h2>

      <div className="info-block">
        <h3>Entreprise</h3>
        <p><strong>Nom :</strong> {recruiter.companyName}</p>
        <p><strong>Secteur :</strong> {recruiter.sector}</p>
      </div>

      <div className="info-block">
        <h3>Contact</h3>
        <p><strong>Email :</strong> {recruiter.email}</p>
      </div>

      <div className="button-group">
        <button onClick={onPublish}>Publier une offre</button>
        <button onClick={onViewOffers}>Mes offres</button>
        <button className="logout" onClick={onLogout}>Se déconnecter</button>
      </div>
    </div>
       
       <Footer />
    </div>
   
  );
}
