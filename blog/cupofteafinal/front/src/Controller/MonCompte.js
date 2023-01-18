import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from "react-router-dom";
import DetailOrder from '../Components/DetailOrder';
import MesInformations from '../Components/MesInformations';


const Connexion = ()  => {

    const [orders, setOrders] = useState([]);
    const [id, setId] = useState(0);

    const navigate = useNavigate();
    const {idUser} = useSelector(state => state);

    //TODO permettre la modification des informations

    useEffect(() => {
        if(idUser == null){
            navigate('/connexion');
        }
        else{
            fetch("/api/getOrders/"+idUser)
            .then(response => response.json())
            .then(response => {
                setOrders(response);
            })
        }
    }, []);

    const details = (e) => {
        setId(e.currentTarget.dataset.id);
    }    

    return(
        <>
            <h1>Mon compte</h1>

            <h2>Mes informations</h2>
            <MesInformations />

            <h2>Mes commandes</h2>
            <div class="flex">
                <table className="commande">
                    <thead>
                        <tr>
                            <th>Numéro de commande</th>
                            <th>Date de la commande</th>
                            <th>Montant de la commande</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        orders.map((order, i) => {
                            return(
                            <tr key={i}>
                                <td>{order.id}</td>
                                <td>{new Date(order.date).toLocaleDateString()}</td>
                                <td>{order.total.toFixed(2)} €</td>
                                <td><button data-id={order.id} onClick={details}><i class="fa fa-eye"></i></button></td>
                            </tr>)
                        })
                    }
                    </tbody>

                </table>
                {id != 0 &&
                <DetailOrder id={id}/>
                }
            </div>
        </>
    )
}

export default Connexion;