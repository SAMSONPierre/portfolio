import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from "react-router-dom";



const Connexion = ()  => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    //useNavigate permettra d'effectuer une redirection
    const navigate = useNavigate();

    //useDispatch permettra d'appeler une action du reducer afin d'écrire dans le styate global
    const dispatch = useDispatch();

    //useSelector permet de lire dans le state global
    const {teas} = useSelector(state => state);

    const changeEmail = (e) => {
        setEmail(e.target.value);
    }

    const changePassword = (e) => {
        setPassword(e.target.value);
    }

    const submit = () => {
        //envoi des données en POST
        let datas = {
            email:email,
            password:password
        }

        let req = new Request("/api/connexion", {
            method:'POST',
            body:JSON.stringify(datas),
            headers : {
                'Accept' : 'application/json',
                'Content-Type' : 'application/json',
            }
        })

        fetch(req)
        .then(response => response.json())
        .then(response => {
            if(response.reponse){
                dispatch({
                    type: 'CONNECT_USER',
                    id: response.id
                })
                setMessage("");
                //redirection
                if(teas.length > 0){
                    navigate("/cart");
                }
                else{
                    navigate("/");
                }
            }
            else{
                setMessage(response.message)
            }           
        })

    }

    return(
        <>
            <h1>Connexion</h1>
            <p style={{ color:'red' }}>{message}</p>
            <form>
                <div>
                    <label htmlFor="email">Votre email</label>
                    <input type="email" id="email" value={email} onChange={changeEmail} />
                </div>
                <div>
                    <label htmlFor="password">Votre mot de passe</label>
                    <input type="password" id="password" value={password} onChange={changePassword}/>
                </div>
                <button className="btn" type="button" onClick={submit}>Se connecter</button>
            </form>
            <p>
                <a href="/createAccount">Je n'ai pas encore de compte</a>
            </p>
        </>
    )
}

export default Connexion;