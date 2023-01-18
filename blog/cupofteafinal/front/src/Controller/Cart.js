import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const Cart = ()  => {

    //les hooks : useSelector permet de lire dans le state global
    const {teas, idUser} = useSelector(state=>state);

    //useDispatch permettra d'appeler une action du reducer afin d'écrire dans le styate global
    const dispatch = useDispatch();

    //useNavigate permettra d'effectuer une redirection
    const navigate = useNavigate();


   const trash = (e) => {
        //appel d'une action du reducer afin supprimer un thé
        dispatch({
            type: 'DELETE_TEA',
            teaId: e.currentTarget.dataset.id
        })
   }

   const validOrder = () => {

        //vérifier si l'utilisateur est connecté d'abord
        if(idUser == "" || idUser == null){
            //s'il n'est pas connecté , on le redirige vers la page de connexion
            navigate('/connexion');
        }
        else{
            //envoi de la commande en base de données
             //envoi des données en POST
            let datas = {
                idUser : idUser,
                teas : teas
            }
    
            let req = new Request("/api/addOrder", {
                method:'POST',
                body:JSON.stringify(datas),
                headers : {
                    'Accept' : 'application/json',
                    'Content-Type' : 'application/json',
                }
            });
      
      
      
            fetch(req)
                .then(response => response.text())
                .then(response => {
                    //on vide le panier
                    if(response.error == null){
                        dispatch({
                            type: 'DELETE_ALL'
                        })

                    }
              })

        }

   }

    return(
        <>
            <h1>Votre panier</h1>
            {teas.map((tea,i) => {
                return(
                    <article className="panier" key={i}>
                        <img src={ "/img/" + tea.img } alt={ tea.nom } />
                        <h3>{tea.nom}</h3>
                        <p>{tea.qte}</p>
                        <p>{tea.price.toFixed(2)}€</p>
                        <p>
                            <button data-id={i} onClick={trash}><i className="fa fa-trash"></i></button>
                        </p>
                    </article>
                )
            })}

            { (teas.length != 0) ?
                <p><button className="btn" onClick={validOrder}>Valider la commande</button></p>
            :
                <p>Votre panier est vide</p>
            }
            
        </>
    )
}

export default Cart;