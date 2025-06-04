import React from 'react'
import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'
import Formulaire_Inscription_Recruteur from '../Components/Formulaire_inscription_recruteur'

function Inscription_Recruteur() {
  return (
    <div>
      <Navbar />

      <Formulaire_Inscription_Recruteur />

      <Footer />
    </div>
  )
}

export default Inscription_Recruteur