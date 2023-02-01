import { useState } from "react";
import { useDispatch } from "react-redux";

const Connexion = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

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
            id: response.id,
          });
          setMessage(response.message);
          //redirection
        } else {
          setMessage(response.message);
        }
      });
  };

  return (
    <>
      <h1>Connexion</h1>
      <p style={{ color: "red" }}>{message}</p>
      <form>
        <div>
          <label htmlFor="email">Votre email</label>
          <input type="email" id="email" value={email} onChange={changeEmail} />
        </div>
        <div>
          <label htmlFor="password">Votre mot de passe</label>
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
    </>
  );
};
export default Connexion;
