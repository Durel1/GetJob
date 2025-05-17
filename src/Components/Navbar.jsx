import React from 'react'
import { NavLink } from 'react-router-dom'
import '../Styles/Components_styles/navbar.css'
import '../Js/navbar.js'

function Navbar() {
  return (
    <nav className="navbar">
        <div className="container">
            <div className="navbar-header">
                <button className="navbar-toggler" data-toggle="open-navbar1">
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <NavLink to="/">
                    <h4>Notre<span>Logo</span></h4>
                </NavLink>
            </div>

            <div className="navbar-menu" id="open-navbar1">
                <ul className="navbar-nav">
                    <li className="active"><NavLink to="/"> Accueil</NavLink></li>
                    <li><NavLink to="/Connection" >Se Connecter</NavLink></li>

                    <li className="navbar-dropdown">
                        <NavLink to="#" className="dropdown-toggler" data-dropdown="my-dropdown-id">
                            S'incrire <i className="fa fa-angle-down"></i>
                        </NavLink>
                        <ul className="dropdown" id="my-dropdown-id">
                            <li><NavLink to="/Inscription-Candidat">Candidat</NavLink></li>
                            <li className="separator"></li>
                            <li><NavLink to="/Inscription-Recruteur">Recruteur</NavLink></li>
                        </ul>
                    </li>

                </ul>
            </div>
        </div>
        <script src="../Js/navbar.js"></script>
    </nav>
  )
}

export default Navbar