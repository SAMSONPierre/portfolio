import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const MesInformations = () => {

    //les states pour gérer me formulaire
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nom, setNom] = useState("");
    const [prenom, setPrenom] = useState("");
    const [message, setMessage] = useState("");

    //un state pour gérer l'état du formulaire (disabled ou non)
    const [dis, setDis] = useState(true);

    //les données issues du state global
    const {idUser} = useSelector(state => state);

    //au chargement du composant, on va chercher les informations qui concernent l'utilisateur
    useEffect(() => {
    
        fetch("/api/getUser/"+idUser)
        .then(response => response.json())
        .then(response => {
            setNom(response.nom);
            setPrenom(response.prenom);
            setEmail(response.email);

        })
        
    }, []);

    //fonction permettant la modification des valeurs contenues dans le formulaire
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

    //envoi des modifications de données utilisateur  
    const modifier = () => {
        setDis(!dis);

        if(dis == false){
            //on envoie les modifications en bdd
             //envoi des données en POST
            let datas = {
                nom:nom,
                prenom:prenom, 
                email:email,
                password:password,
                id:idUser
            }
        
            let req = new Request("/updateUser", {
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
                    setMessage('Les modifications ont bien été prises en compte');
                })
                    
        }
    }

    return (
        <form>
            <div>
                <label htmlFor="nom">Nom</label>
                <input type="text" id="nom" value={nom} disabled={dis} onChange={handleChange} />
            </div>

            <div>
                <label htmlFor="prenom">Prénom</label>
                <input type="text" id="prenom" value={prenom} disabled={dis} onChange={handleChange} />
            </div>

            <div>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" value={email} disabled={dis} onChange={handleChange} />
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
            {/* si il y a un message alors on l'affiche*/}
            { message != "" && 
                <p>{message}</p>
            }
            <button type="button" onClick={modifier}>{ dis==true ? 'Modifier':'Valider les modifications'}</button>
        </form>
    );
}


export default MesInformations;
