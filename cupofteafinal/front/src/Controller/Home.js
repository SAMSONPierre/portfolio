

import { useEffect, useState } from "react";

function Home() {

  const [coupDeCoeur, setCoupDeCoeur] = useState({});
  const [nouveaute, setNouveaute] = useState({});
  const [bestseller, setBestseller] = useState({});

  useEffect(() => {
    fetch('/coupDeCoeur')
        .then(response => response.json())
        .then(res => {
            console.log(res);
            setCoupDeCoeur(res);
        })

      fetch('/nouveaute')
      .then(response => response.json())
      .then(res => {
          console.log(res);
          setNouveaute(res);
      })

      fetch('/bestseller')
      .then(response => response.json())
      .then(res => {
          console.log(res);
          setBestseller(res);
      })

  }, [])


  return (
    <>
      <section id="noel">
        <h1>C'est noël chez Cup of Tea, profitez-en !</h1>
        <img
          src="./img/offre-noel.jpg"
          alt="Offre spéciale pour noel ! Dès 45€ d'achat, le photophore de noël vous sera offert. Et dès 85€ un thé vert au prune et coing de 100 gramme vous sera offert"
        />
        <small>Pour toute commande effectuée avant le 20 décembre</small>
      </section>
      <section id="slider">
        <div className="flexslider">
          <ul className="slides">
            <li>
              <img
                src="./img/slider/1.jpg"
                alt="Retrouvez toute nos idées cadeaux pour les fêtes de noël"
              />
            </li>
            <li>
              <img
                src="./img/slider/2.jpg"
                alt="Retrouvez toute la collection des thés numéro 25 et notre nouvelle édition limitée"
              />
            </li>
          </ul>
        </div>
      </section>
      <section id="categorie">
        <h2>
          <span>Choisissez votre thé</span>
        </h2>
        <a href="#">
          <img src="img/tea/1.jpg" alt="Tasse de thé noir" />
          <h3>Thé noir</h3>
        </a>
        <a href="#">
          <img src="img/tea/2.jpg" alt="Tasse de thé vert" />
          <h3>Thé vert</h3>
        </a>
        <a href="#">
          <img src="img/tea/3.jpg" alt="Tasse de oolong" />
          <h3>Oolong</h3>
        </a>
        <a href="#">
          <img src="img/tea/4.jpg" alt="Tasse de thé blanc" />
          <h3>Thé blanc</h3>
        </a>
        <a href="#">
          <img src="img/tea/5.jpg" alt="Tasse de rooibos" />
          <h3>Rooibos</h3>
        </a>
      </section>
      <section id="tea">
        <article id="new">
          <h2>
            <span>Notre nouveauté</span>
          </h2>
          <img src={ "/img/" + nouveaute.image } alt={ nouveaute.nom } />
          <h3>{ nouveaute.nom }</h3>
          
          <p>{ nouveaute.sous_titre }</p>
          <section className="price">
            <p>
              À partir de <strong>{ nouveaute.prix } €</strong>
            </p>
          </section>
          <a class="btn" href="#">
            Voir ce produit
          </a>
        </article>
        <article id="best">
          <h2>
            <span>Notre best-seller</span>
          </h2>
          <img src={ "/img/" + bestseller.image } alt={ bestseller.nom } />
          <h3>{ bestseller.nom }</h3>
          <p>
          { bestseller.sous_titre }
          </p>
          <section class="price">
            <p>
              À partir de <strong>{ bestseller.prix } €</strong>
            </p>
          </section>
          <a class="btn" href="#">
            Voir ce produit
          </a>
        </article>
        <article id="crush">
          <h2>
            <span>Notre coup de coeur</span>
          </h2>
          <img src={ "/img/" + coupDeCoeur.image } alt={ coupDeCoeur.nom } />
          <h3>{ coupDeCoeur.nom }</h3>
          <p>{ coupDeCoeur.sous_titre }</p>
        
          <section className="price">
            <p>
              À partir de <strong>{ coupDeCoeur.prix } €</strong>
            </p>
          </section>
          <a class="btn" href="product.html">
            Voir ce produit
          </a>
        </article>
      </section>
    </>
  );
}

export default Home;
