import React from 'react'
import '../Styles/Components_styles/recruitingCompanies.css'

function RecruitingCompanies() {
  return (
    <div className="recruiting-container">
      <h2 className="recruiting-title">Les entreprises qui recrutent</h2>
      <div className="recruiting-companies">
        <div className="featured-company">
                <div className="featured-header">L‘entreprise à la une</div>
            <div className="featured-logo">Logo</div>
        </div>
        <div className="company-slider">
            <button className="nav-button">&#10094;</button>
            <div className="company-card" />
            <div className="company-card" />
            <div className="company-card" />
            <div className="company-card" />
            <div className="company-card" />
            <button className="nav-button">&#10095;</button>
        </div>
      </div>
    </div>
  )
}

export default RecruitingCompanies