import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Connection from './Pages/Connection';
import Inscription_Candidat from './Pages/Inscription_Candidat';
import Inscription_Recruteur from './Pages/Inscription_Recruteur';
import FormulaireConnection from './components/FormulaireConnection';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/connection" element={<Connection />} />
        <Route path="/connexion" element={<FormulaireConnection />} />
        <Route path="/inscription_candidat" element={<Inscription_Candidat />} />
        <Route path="/inscription_recruteur" element={<Inscription_Recruteur />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
