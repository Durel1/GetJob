import React, { useState } from "react";
import "../styles/Components_styles/RecruiterProfile.css"; // Assurez-vous d'avoir ce fichier CSS

export default function Publier_offre() {
  const [form, setForm] = useState({
    companyName: "",
    sector: "",
    description: "",
    logo: null,
    jobTitle: "",
    jobDescription: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profil recruteur soumis !");
  };

  return (
    <div className="recruiter-container">
      <h2>Profil Recruteur</h2>
      <form onSubmit={handleSubmit}>

        <section>
          <h3>Informations sur l'entreprise</h3>
          <input
            type="text"
            name="companyName"
            placeholder="Nom de l'entreprise"
            value={form.companyName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="sector"
            placeholder="Secteur d'activité"
            value={form.sector}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description de l'entreprise"
            value={form.description}
            onChange={handleChange}
            required
          />
          <label style={{color:'#003c5f'}}>Logo
            <input
              type="file"
              name="logo"
              accept="image/*"
              onChange={handleChange}
            />
          </label>
        </section>

        <section>
          <h3>Publier une offre</h3>
          <input
            type="text"
            name="jobTitle"
            placeholder="Intitulé du poste"
            value={form.jobTitle}
            onChange={handleChange}
            required
          />
          <textarea
            name="jobDescription"
            placeholder="Description de l'offre"
            value={form.jobDescription}
            onChange={handleChange}
            required
          />
        </section>

        <button type="submit">Publier l'annonce</button>
      </form>
    </div>
  );
}
