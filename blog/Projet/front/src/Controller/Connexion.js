import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Connexion = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  //useDispatch permettra d'appeler une action du reducer afin d'écrire dans le styate global
  const dispatch = useDispatch();

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const submit = () => {
    //envoi des données en POST
    let datas = {
      email: email,
      pwd: password,
    };

    let req = new Request("/login", {
      method: "POST",
      body: JSON.stringify(datas),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    fetch(req)
      .then((response) => response.json())
      .then((response) => {
        if (response.message) {
          dispatch({
            type: "CONNECT_USER",
            id: datas.email,
          });
          setMessage(response.message);
          navigate("/");
        } else {
          setMessage(response.message);
        }
      });
  };

  return (
    <main>
      <h1>Connexion admin</h1>
      <p style={{ color: "red" }}>{message}</p>
      <form>
        <div>
          <label htmlFor="email">Identifiant</label>
          <input type="email" id="email" value={email} onChange={changeEmail} />
        </div>
        <div>
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={changePassword}
          />
        </div>
        <button className="btn" type="button" onClick={submit}>
          Se connecter
        </button>
      </form>
    </main>
  );
};
export default Connexion;
