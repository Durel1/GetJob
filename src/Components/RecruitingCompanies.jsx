import React from 'react'
import '../Styles/Components_styles/recruitingCompanies.css'

function RecruitingCompanies() {
  return (
    <div className="recruiting-container">
      <h2 className="recruiting-title">Les entreprises qui recrutent</h2>
      <div className="recruiting-companies">
        <div className="featured-card">
          <div className="featured-header">L´entreprise à la une</div>
          <div className="featured-body" />
        </div>
        <div className="company-slider">
          <button className="nav-button">&#10094;</button>
          <div className="company-card comp1"></div>
          <div className="company-card comp2"></div>
          <div className="company-card comp3"></div>
          <div className="company-card comp4"></div>
          <div className="company-card comp5"></div> 
          <button className="nav-button">&#10095;</button>
        </div>
      </div>
    </div>
  )
}

export default RecruitingCompanies