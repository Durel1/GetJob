import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

import Home from './Pages/Home';
import Connection from './Pages/Connection';
import Inscription_Candidat from './Pages/Inscription_Candidat';
import Inscription_Recruteur from './Pages/Inscription_Recruteur';
import Soumission_candidature from './Pages/Soumission_candidature';
import Publication_offre from './Pages/Publication_offre';
import CandidateDashboard from './Pages/CandidateDashboard';
import RecruiterDashboard from './Pages/RecruiterDashboard';

function App() {
  const [candidatInfo, setCandidatInfo] = useState(null);
  const [recruteurInfo, setRecruteurInfo] = useState(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/connection" element={<Connection />} />
        <Route path="/inscription_candidat" element={<Inscription_Candidat />} />
        <Route path="/inscription_recruteur" element={<Inscription_Recruteur />} />
        <Route path="/Soumission_candidature" element={<Soumission_candidature />} />
        <Route path="/Publication_offre" element={<Publication_offre />} />
        <Route
          path="/CandidateDashboard"
          element={
            <CandidateDashboard
              candidate={candidatInfo || { name: "Nom Candidat", email: "candidat@email.com", phone: "0123456789", school: "Université", degree: "Licence" }}
              onLogout={() => window.location.href = '/'}
              onApply={() => window.location.href = '/Soumission_candidature'}
              onViewApplications={() => alert("Page des candidatures à développer")}
            />
          }
        />
        <Route
          path="/RecruiterDashboard"
          element={
            <RecruiterDashboard
              recruiter={recruteurInfo || { recruiterName: "Nom Recruteur", companyName: "Entreprise XYZ", sector: "Secteur", email: "recruteur@email.com" }}
              onLogout={() => window.location.href = '/'}
              onPublish={() => window.location.href = '/Publication_offre'}
              onViewOffers={() => alert("Page Mes Offres à développer")}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
