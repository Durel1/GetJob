import React, { useState } from 'react';

function Inscrire_candidat() {
  const [form, setForm] = useState({
    nom: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Sauvegarde dans localStorage (exemple simple)
    localStorage.setItem('user', JSON.stringify(form));
    alert('Inscription réussie !');
  };

  return (
    <div>
      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.title}>Inscription Candidat</h2>
          <form onSubmit={handleSubmit}>
            <div style={styles.formGroup}>
              <label style={{color: '#333'}}>Nom complet :</label>
              <input
                type="text"
                name="nom"
                value={form.nom}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={{color: '#333'}}>Email :</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>
            <div style={styles.formGroup}>
              <label style={{color: '#333'}}>Mot de passe :</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                style={styles.input}
              />
            </div>
            <button type="submit" style={styles.button}>
              S'inscrire
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '80vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#f7f9fc',
  },
  card: {
    background: '#fff',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 0 15px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '450px',
  },
  title: {
    color: '#333',
    fontSize: '24px',
    textAlign: 'center',
    marginBottom: '20px',
  },
  formGroup: {
    color: '#333',
    marginTop: '10px',
    marginBottom: '15px',
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: "#004a7f",
    color: '#fff',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Inscrire_candidat;
