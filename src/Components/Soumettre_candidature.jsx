import React, { useState } from "react";
import "../styles/Components_styles/CandidateProfile.css"; // Assurez-vous d'avoir ce fichier CSS

export default function Soumettre_candidature() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    email: "",
    school: "",
    degree: "",
    skills: "",
    cv: null,
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm({
      ...form,
      [name]: files ? files[0] : value,
    });
  };

  const next = () => setStep((prev) => prev + 1);
  const prev = () => setStep((prev) => prev - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Profil soumis !");
  };

  return (
    <div className="profile-container">
      <h2>Compléter mon profil</h2>
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div className="step">
            <h2 style={{color:'#333'}}>Informations personnelles</h2>
            <input type="text" name="name" placeholder="Nom complet" value={form.name} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Adresse email" value={form.email} onChange={handleChange} required />
          </div>
        )}
        {step === 2 && (
          <div className="step">
            <h2 style={{color:'#333'}}>Formation</h2>
            <input type="text" name="school" placeholder="École / Université" value={form.school} onChange={handleChange} required />
            <input type="text" name="degree" placeholder="Diplôme préparé" value={form.degree} onChange={handleChange} required />
          </div>
        )}
        {step === 3 && (
          <div className="step">
            <h2 style={{color:'#333'}}>Compétences</h2>
            <textarea name="skills" placeholder="Listez vos compétences…" value={form.skills} onChange={handleChange} required  style={{color:'black'}}/>
          </div>
        )}
        {step === 4 && (
          <div className="step">
            <h2 style={{color:'#333'}}>Joindre CV et photo</h2>
            <label style={{color:'#333'}}>CV (PDF) <input type="file" name="cv" accept="\application/pdf" onChange={handleChange} required /></label>
            <label style={{color:'#333'}}>Photo <input type="file" name="photo" accept="\image/*" onChange={handleChange} /></label>
          </div>
        )}
        {step === 5 && (
          <div className="step">
            <h2 style={{color:'#333'}}>Résumé</h2>
            <p><strong>Nom :</strong> {form.name}</p>
            <p><strong>Email :</strong> {form.email}</p>
            <p><strong>École :</strong> {form.school}</p>
            <p><strong>Diplôme :</strong> {form.degree}</p>
            <p><strong>Compétences :</strong> {form.skills}</p>
            <p><strong>CV :</strong> {form.cv ? form.cv.name : "Non chargé"}</p>
            <p><strong>Photo :</strong> {form.photo ? form.photo.name : "Non chargée"}</p>
          </div>
        )}

        <div className="buttons">
          {step > 1 && step <= 5 && <button style={{width:'20%'}} type="button" onClick={prev}>Précédent</button>}
          {step < 5 && <button style={{width:'20%'}} type="button" onClick={next}>Suivant</button>}
          {step === 5 && <button style={{width:'20%'}} type="submit">Soumettre</button>}
        </div>
      </form>
    </div>
  );
}
