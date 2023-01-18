import { useSelector } from "react-redux";

const Cart = () => {

    //lecture dans le state des informations nécessaires pour ce composant
    const {montant, teas} = useSelector(state => state);
    
    return(
        <section id="cart">
              <span><a href="/cart">Mon panier</a></span><span className="sup">{teas.length}</span>
              <strong>{montant.toFixed(2)}€</strong>
        </section>
    )
}

export default Cart;