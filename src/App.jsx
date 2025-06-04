import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Connection from './Pages/Connection'
import Inscription_Candidat from './Pages/Inscription_Candidat'
import Inscription_Recruteur from './Pages/Inscription_Recruteur'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Connection" element={< Connection/>} />
          <Route path="/Inscription_Candidat" element={<Inscription_Candidat/>} />
          <Route path="/Inscription_Recruteur" element={<Inscription_Recruteur/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

