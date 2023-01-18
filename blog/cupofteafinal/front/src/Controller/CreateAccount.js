import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";


const CreateAccount = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    switch (e.target.id) {
      case "nom":
        setNom(e.target.value);
        break;
      case "prenom":
        setPrenom(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
    }
  };

  const submit = () => {

    //envoi des données en POST
    let datas = {
      nom:nom,
      prenom:prenom, 
      email:email,
      password:password
    }

    let req = new Request("/insertUser", {
        method:'POST',
        body:JSON.stringify(datas),
        headers : {
          'Accept' : 'application/json',
          'Content-Type' : 'application/json',
      }
    });



    fetch(req)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            if(response.message==""){
              setNom("");
              setPrenom("");
              setEmail("");
              setPassword("");
              navigate("/connexion");
            }
            else{
              setMessage(response.message);
            }
        })


  };

  return (
    <>
      <h1>Créer un compte</h1>
      {message != "" &&
        <p>{message}</p>}
      <form id="cr">
        <div>
          <label htmlFor="nom">Votre nom</label>
          <input
            type="text"
            id="nom"
            value={nom}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="prenom">Votre prénom</label>
          <input
            type="text"
            id="prenom"
            value={prenom}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Votre email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Votre mot de passe</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handleChange}
          />
        </div>
        <button className="btn" type="button" onClick={submit}>
          Créer un compte
        </button>
      </form>
      <p>
        <a href="/connexion">J'ai déjà un compte</a>
      </p>
    </>
  );
};

export default CreateAccount;
