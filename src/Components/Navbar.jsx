import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import '../Styles/Components_styles/navbar.css'

function Navbar() {
  // État pour gérer l'ouverture du menu déroulant "S'incrire"
  const [dropdownOpen, setDropdownOpen] = useState(false)
  // État pour gérer l'ouverture du menu sur mobile
  const [menuOpen, setMenuOpen] = useState(false)

  // Ferme le menu déroulant si on clique en dehors
  React.useEffect(() => {
    function handleClickOutside(event) {
      if (!event.target.closest('.navbar-dropdown')) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (

    <nav className="navbar">
      <div className="container">

        <div className="navbar-header">
          {/* Bouton pour ouvrir/fermer le menu sur mobile */}
          <button
            className="navbar-toggler"
            data-toggle="open-navbar1"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <NavLink to="/">
            <img  className="logo" src="" alt="LOGO" />
          </NavLink>
        </div>

        {/* Menu principal de la navbar */}
        <div className={`navbar-menu${menuOpen ? ' active' : ''}`} id="open-navbar1">
          <ul className="navbar-nav">

            <li>
              <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")} end >Accueil</NavLink>
            </li>
            <li>
              <NavLink to="/Connection" className={({ isActive }) => (isActive ? "active" : "")}>Se Connecter</NavLink>
            </li>
            
            {/* Menu déroulant S'incrire */}
            <li className="navbar-dropdown">
              <button style={{color: '#3c4250',}}
                className="dropdown-toggler"
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                S'incrire <i className="fa fa-angle-down"></i>
              </button>
              {/* Sous-menu déroulant */}
              <ul className={`dropdown${dropdownOpen ? ' show' : ''}`} id="my-dropdown-id">
                <li>
                  <NavLink to="/Inscription_Candidat" className={({ isActive }) => (isActive ? "active" : "")}>Candidat</NavLink>
                </li>
                <li className="separator"></li>
                <li>
                  <NavLink to="/Inscription_Recruteur" className={({ isActive }) => (isActive ? "active" : "")}>Recruteur</NavLink>
                </li>
              </ul>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar