import {useEffect, useState} from 'react';
import { useParams } from "react-router-dom";
import {useDispatch} from 'react-redux';

function Tea() {

    const [tea, setTea] = useState({});
    const [format, setFormat] = useState([]);
    const { id } = useParams();
    const [price, setPrice] = useState(0);
    const [cond, setCond] = useState(0);

    const dispatch = useDispatch();


    useEffect(() => {
        fetch('/getTea/'+id)
        .then(response => response.json())
        .then(res => {
            console.log(res);
            setTea(res);
        })

        fetch('/getFormat/'+id)
        .then(response => response.json())
        .then(res => {
            let min = 100;
            let minCond = "";
            for(const r of res){
                if(r.prix < min){
                    min = r.prix;
                    minCond = r.conditionnement;
                }
            }
            setPrice(min);
            setFormat(res);
            setCond(minCond);
        })
    }, [])

    const change = (e) => {
        setCond(e.target.value);
        
    }

    const changePrice = (e) => {
        let price = parseFloat(e.target.dataset.price);
        setPrice(price);
    }

    const add = () => {
        
        dispatch({
            type: 'ADD_TEA',
            tea: {id: id, img:tea.image,nom:tea.nom, qte: cond , price: price}
        })

    }

    return (
        <>
            <section id="product">
				<section id="product-detail">
					<div id="product-name">
						<h1>{ tea.nom }</h1>
						<h2>{ tea.sous_titre }</h2>
						<p>Ref : { tea.ref }</p>
					</div>
					
				</section>
				<section id="product-quantity">
					<img src={ "/img/" + tea.image } alt={ tea.nom } />
					<div class="price">
						<select value={cond} name="quantity" onChange={change}>
                            { format.map((form, i ) => <option onClick={changePrice} data-price={form.prix} key={i}>{ form.conditionnement }</option>) }
						</select>
						<h3>{ price.toFixed(2) }€</h3>
						<a class="btn" onClick={add} href="#">Ajouter au panier</a>
						<a id="wishlist" href="#">Ajouter à ma liste d'envie</a>
					</div>
				</section>
				<section id="product-description" dangerouslySetInnerHTML={{__html:tea.description}} />
					
			</section>
        </>
    );
}

export default Tea;
