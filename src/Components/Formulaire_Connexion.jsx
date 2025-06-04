import React, { useState } from "react";

const Formulaire_Connexion = () => {
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Tentative de connexion :", { email, motDePasse });
  };

  return (
    <div style={styles.container}>
      <h2 style={{color :'#333',fontSize: '24px'}}>Formulaire de connexion</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          placeholder="Adresse email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={motDePasse}
          onChange={(e) => setMotDePasse(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Se connecter</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    border: "1px solid #ccc",
    maxWidth: "400px",
    margin: "50px auto",
    padding: "20px",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    textAlign: "center",
    fontFamily: "Arial"
  },
  form: {

    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },
  input: {
    margin: "10px 0",
    backgroundColor: "#fff",
    color: "black",
    border: "1px solid #ccc",
    borderRadius: "4px",
    width: "100%",
    padding: "10px",
    fontSize: "16px"
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    backgroundColor: "#004a7f",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    fontWeight: "bold",
    cursor: "pointer"
  }
};

export default Formulaire_Connexion;
