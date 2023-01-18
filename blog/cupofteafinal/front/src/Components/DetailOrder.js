import { useEffect, useState } from "react";

const DetailOrder = ({id})  => {

    const [details, setDetails] = useState([]);

    useEffect(() => {
        fetch('/api/orderDetail/'+id)
        .then(response => response.json())
        .then(response => {
            setDetails(response);
        })
    })
    
    return(
        <div>
       
            <h3>Commande n° {id}</h3>
            {details.map((detail, i) => {
                return(
                    <>
                        <p>{detail.nom} - {detail.cond} - {detail.price.toFixed(2)} €</p>
                    </>
                )
            })}
        
        </div>
    )
}


export default DetailOrder;