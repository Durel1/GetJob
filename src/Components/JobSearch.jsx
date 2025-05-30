import React from "react";
import "../Styles/Components_styles/JobSearch.css"; 

const JobSearch = () => {
  return (
    <div className="job-search-container">
      <div className="top-buttons">
        <button className="candidate-button">
          Candidat : Déposez votre CV
        </button>

        <button className="recruiter-button">
          Recruteur : Publiez une annonce
        </button> 
      </div>

      <div className="search-box">
        <h2 className="search-title">
          Trouvez votre futur job parmi <span className="highlight">2060</span> postes ouverts
        </h2>
        <div className="search-inputs">
          <input
            type="text"
            placeholder="Mots-clés"
            className="input"
          />
          <select className="input">
            <option>Région(s)</option>
          </select>
          <select className="input">
            <option>Métier</option>
          </select>
          <button className="search-button">
            <svg xmlns="http://www.w3.org/2000/svg" className="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 103.6 3.6a7.5 7.5 0 0013.05 13.05z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobSearch;