import { useEffect, useState } from "react";

const AllTeas = () => {

    const [teas, setTeas] = useState([]);

    useEffect(() => {
        fetch('/teas')
        .then(response => response.json())
        .then(response => {
            setTeas(response);
        })
    })
    //TODO modifier et supprimer
    //TODO rajouter des comm sur l'ensemble du projet

    return(
        <>
            <h2>Les thés</h2>
            <table>
                <thead>
                    <tr>
                        <th>Image</th>
                        <th>Nom</th>
                        <th>Catégorie</th>
                        <th></th>
                    </tr>

                </thead>
                <tbody>
                    {teas.map((tea, i) => {
                        return(
                            <tr key={i}>
                                <td><img style={{ maxWidth:'80px' }} src={'img/'+tea.image} /></td>
                                <td>{tea.nom}</td>
                                <td>{tea.nomCat}</td>
                                <td>
                                    <button className="btn">Modifier</button>
                                    <button className="btn">Supprimer</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>

    )
}


export default AllTeas;