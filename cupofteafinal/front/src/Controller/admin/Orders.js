import { useEffect, useState } from "react";

const Orders = () => {

    const [orders, setOrders] = useState([]);
    const [filtre, setFiltre] = useState('toutes');
    const [valueFiltre, setValueFiltre] = useState('toutes');
    const [vue, setVue] = useState('liste');

    const [id, setId] = useState(0);
    const [order, setOrder] = useState({});
    const [details, setDetails] = useState([]);

    useEffect(() => {
        fetch('/orders')
        .then(response => response.json())
        .then(response => {
            setOrders(response);
        })
    }, [])


    const changeStatut = (e) => {

        let target = e.currentTarget;
        let id = target.dataset.id;

        fetch('/order/changeStatut/'+id)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            console.log(e.currentTarget)
            target.checked = 'checked';
        })
        
    }

    const handleChange = (e) => {
        setValueFiltre(e.target.value);
    }

    const showDetail = (e) => {
        setVue('detail');
        setId(e.currentTarget.dataset.id);

        fetch("/api/order/"+e.currentTarget.dataset.id)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            setOrder(response);
        })

        fetch("/api/orderDetail/"+e.currentTarget.dataset.id)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            setDetails(response);
        })
    }

    const retour = () => {
        setVue('liste');
    }

    return(
        <>
        {vue == 'liste' && 
            <>
            <h2>Les commandes</h2>
            <p>
                Filtrer par 
                <select value={valueFiltre} onChange={handleChange}>
                    <option onClick={() => setFiltre('toutes')}>Toutes</option>
                    <option onClick={() => setFiltre(0)}>Non traitées</option>
                    <option onClick={() => setFiltre(1)}>Traitées</option>
                </select>
            </p>
            <table>
                    <thead>
                        <tr>
                            <th>Numéro de commande</th>
                            <th>Date</th>
                            <th>Nom du client</th>
                            <th>Montant total</th>
                            <th>Traitée</th>
                            <th></th>
                        </tr>

                    </thead>
                    <tbody>
                        {orders.map((order, i) => {
                            return(
                                <>
                                {(filtre == 'toutes' || filtre == order.statut) &&
                            
                                    <tr key={i}>
                                        <td>{order.id}</td>
                                        <td>{new Date(order.date).toLocaleDateString()}</td>
                                        <td>{order.prenom} {order.nom}</td>
                                        <td>{order.total.toFixed(2)} €</td>
                                        <td><input data-id={order.id} onChange={changeStatut} type="checkbox" checked={order.statut == 1 ? true : false} /></td>
                                        <td>
                                            <button onClick={showDetail} data-id={order.id} className="btn">Voir le détail</button>
                                        </td>
                                    </tr>
                                }
                                </>
                            )
                        })}
                    </tbody>
                </table>
            </>
            }

            { vue == 'detail' && 
                <>
                    <h2>Détail de la commande n° {id}</h2>
                    <p>Passée le {new Date(order.date).toLocaleDateString()}</p>
                    <p><strong>Informations client : </strong>{order.prenom} {order.nom}</p>
                    <p>Statut: { (order.statut == 1)? 'Traitée' : 'Non traitée' }</p>
                    <p><strong>Details : </strong></p>
                    {
                        details.map((detail, i ) => <p>{detail.nom} - {detail.cond} - {detail.price.toFixed(2)} €</p>)
                    }
                    <button className="btn" onClick={retour}>Retour à la liste</button>
                </>
            
            }

        </>
    )
}


export default Orders;