import Orders from './Orders';
import AllTeas from './AllTeas';
import AddTea from './AddTea';
import {useState} from 'react';

const Admin = () => {

    const [onglet, setOnglet] = useState(1);

    return(
        <>
        <h1>Dashboard</h1>
            <nav>
                <button className="btn" onClick={() => setOnglet(1)}>Liste des commandes</button>
                <button className="btn" onClick={() => setOnglet(2)}>Liste des thés</button>
                <button className="btn" onClick={() => setOnglet(3)}>Ajouter un thé</button>
            </nav>
            <div>
                {onglet === 1 &&
                    <Orders />
                }
                {onglet === 2 &&
                    <AllTeas />
                }  
                {onglet === 3 &&
                    <AddTea />
                }
            </div>

        </>
    )
}


export default Admin;