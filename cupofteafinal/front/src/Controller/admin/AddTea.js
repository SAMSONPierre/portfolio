import { useState, useEffect } from "react";

const AddTea = () => {
    const [nom, setNom] = useState("");
    const [sousTitre, setSousTitre] = useState("");
    const [description, setDescription] = useState("");
    const [ref, setRef] = useState("");
    const [stock, setStock] = useState(0);
    const [cdc, setCdc] = useState(0);
    const [cat, setCat] = useState(0);
    const [cats, setCats] = useState([]);


    useEffect(() => {
        fetch('/cats')
        .then(response => response.json())
        .then(response => {
            setCats(response);
        })
    }, [])

    const handleChange = (e) => {
        switch (e.target.id) {
          case "nom":
            setNom(e.target.value);
            break;
          case "soustitre":
            setSousTitre(e.target.value);
            break;
          case "description":
            setDescription(e.target.value);
            break;
          case "ref":
            setRef(e.target.value);
            break;
        case "stock":
            setStock(e.target.value);
            break;
        case "cdc":
            setCdc(e.target.value);
            break;
        }
      };

      const submit = (e) => {
        let form = new FormData(document.getElementById('add'));
        
        let req = new Request("/insertTea", {
            method:'POST',
            body:form,
            headers : {
                'Accept' : 'multipart/form-data',
                'Content-Type' : 'multipart/form-data',
            }
            
        });
        //TODO envoi formdata ne fonctionne pas + rajout des formats
        fetch(req)

      }


    return(
        <>
            <h2>Ajouter un thé</h2>
            <form id="add" encType="multipart/form-data">
                <div>
                    <label htmlFor="ref">Référence</label>
                    <input type="text" id="ref" name='ref' value={ref} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="cat">Catégorie</label>
                    <select id="cat" name="cat" value={cat} onChange={handleChange}>
                            {
                                cats.map((cat, i) => <option key={i} value={cat.id}>{cat.nom}</option>)
                            }
                    </select>

                </div>
                <div>
                    <label htmlFor="nom">Nom du thé</label>
                    <input type="text" id="nom" name="nom" value={nom} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="soustitre">Sous-titre</label>
                    <textarea id="soustitre" name="soustitre" value={sousTitre} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea id="description" name="description" value={description} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="stock">Stock</label>
                    <input type="text" id="stock" name="stock" value={stock} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="photo">Image</label>
                    <input type="file" id="photo" name="photo" />
                </div>
                <div>
                    <label htmlFor="cdc">
                    <input type="checkbox" id="cdc" name="cdc" value={cdc} onChange={handleChange} />
                     Coup de coeur</label>
                </div>
                <div>
                    <button type="button" onClick={submit} className="btn">Ajouter</button>
                </div>
                
                
            </form>
        </>
    )
}


export default AddTea;