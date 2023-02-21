import {useEffect, useState} from 'react';

function Teas() {

    const [teas, setTeas] = useState([]);
    const [cats, setCats] = useState([]);

    useEffect(() => {
        fetch('/teas')
        .then(response => response.json())
        .then(res => {
            console.log(res);
            setTeas(res);
        })

        fetch('/cats')
        .then(response => response.json())
        .then(res => {
            console.log(res);
            setCats(res);
        })

    }, [])

    return (
       
        <>
            {cats.map((cat, i) => 
                <section className="tea" key={i}>
                        <img src={"img/"+cat.image} alt={ cat.nom } />
                        <h2><span>{ cat.nom }</span></h2>
                        <p className="clear">{ cat.description }</p>
                        <section className="listing-product">
                            {teas.map((tea, i) => 
                                tea.id_category == cat.id &&
                                    <article key={i}>
                                      
                                        <h3>{ tea.nom }</h3>
                                        <img src={ "/img/" + tea.image } alt={ tea.nom } />
                                        <section className="price">
                                            <p>À partir de <strong>{ tea.prix } €</strong></p>
                                        </section>
                                        <a className="btn" href={"/tea/"+tea.id}>Voir ce produit</a>
                                    </article>
                                
                            )}
                        </section>
                    </section>
                )
            }
        </>
       
    );
}

export default Teas;
