import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Connection from './Pages/Connection';
import Inscription_Candidat from './Pages/Inscription_Candidat';
import Inscription_Recruteur from './Pages/Inscription_Recruteur';
import Soumission_candidature from './Pages/Soumission_candidature';
import Publication_offre from './Pages/Publication_offre';
import CandidateDashboard from './Pages/CandidateDashboard';
import RecruiterDashboard from './Pages/RecruiterDashboard';


function App() {
  // Define candidatInfo and recruteurInfo with default or fetched values
  const candidatInfo = {}; // Replace with actual candidate info or state
  const recruteurInfo = {}; // Replace with actual recruiter info or state

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/connection" element={<Connection />} />
        <Route path="/inscription_candidat" element={<Inscription_Candidat />} />
        <Route path="/inscription_recruteur" element={<Inscription_Recruteur />} />
        <Route path="/Soumission_candidature" element={<Soumission_candidature />} />
        <Route path="/Publication_offre" element={<Publication_offre />} />
        <Route path="/CandidateDashboard" element={<CandidateDashboard candidate={candidatInfo} />} />
        <Route path="/RecruiterDashboard" element={<RecruiterDashboard recruiter={recruteurInfo} />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App

