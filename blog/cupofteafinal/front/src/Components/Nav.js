import { useSelector } from "react-redux";

const Nav = () => {

    //récupération de l'idUser du state global pour savoir s'il est connecté
    const {idUser} = useSelector(state=>state);

    return(
        <nav>
            <a href="/teas">Thés</a>
            <a href="/histoire">Notre histoire</a>
            {/* gestion des onglets en fonction de la connexion ou non d'un utilisateur */}
            {(idUser == null || idUser == undefined) 
                ?  
                <a href="/connexion">Me connecter</a> 
                : 
                <span><a href="/deconnexion">Me deconnecter</a>
                <a href="/moncompte">Mon compte</a></span>
            }
            
          </nav>
    )
}

export default Nav;