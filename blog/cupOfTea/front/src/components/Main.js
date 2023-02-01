import { useEffect, useState } from "react";

const Main = () => {
  const [liste, setListe] = useState([]);

  useEffect(() => {
    fetch("/api/tea")
      .then((response) => response.json())
      .then((res) => {
        console.log(res);

        // if (liste.length > 0) {
        //   let lengthDBTea = liste.length - 1;
        //   setLastTea(liste[lengthDBTea].name);
        //   setLastTeaDesc(liste[lengthDBTea].description);
        //   console.log(lastTea);

        //   console.log("salut");
        // }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [liste]);

  return (
    <main className="container">
      <section id="noel">
        <h1>C'est noël chez Cup of Tea, profitez-en !</h1>
        <img
          src="img/offre-noel.jpg"
          alt="Offre spéciale pour noel ! Dès 45€ d'achat, le photophore de noël vous sera offert. Et dès 85€ un thé vert au prune et coing de 100 gramme vous sera offert"
        />
        <small>Pour toute commande effectuée avant le 20 décembre</small>
      </section>
      <section id="slider">
        <div className="flexslider">
          <ul className="slides">
            <li>
              <img
                src="img/slider/1.jpg"
                alt="Retrouvez toute nos idées cadeaux pour les fêtes de noël"
              />
            </li>
            <li>
              <img
                src="img/slider/2.jpg"
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
        <a href="index.html">
          <img src="img/tea/1.jpg" alt="Tasse de thé noir" />
          <h3>Thé noir</h3>
        </a>
        <a href="index.html">
          <img src="img/tea/2.jpg" alt="Tasse de thé vert" />
          <h3>Thé vert</h3>
        </a>
        <a href="index.html">
          <img src="img/tea/3.jpg" alt="Tasse de oolong" />
          <h3>Oolong</h3>
        </a>
        <a href="index.html">
          <img src="img/tea/4.jpg" alt="Tasse de thé blanc" />
          <h3>Thé blanc</h3>
        </a>
        <a href="index.html">
          <img src="img/tea/5.jpg" alt="Tasse de rooibos" />
          <h3>Rooibos</h3>
        </a>
      </section>
      <section id="tea">
        <article id="new">
          <h2>
            <span>Notre nouveauté</span>
          </h2>
          <img src="img/product/product1.jpg" alt="Thé du Hammam" />
          {/* <h3>{liste[0].name}</h3> */}
          <p>{}</p>
          <section className="price">
            <p>
              À partir de <strong>8,50€</strong>
            </p>
          </section>
          <a className="btn" href="index.html">
            Voir ce produit
          </a>
        </article>
        <article id="best">
          <h2>
            <span>Notre best-seller</span>
          </h2>
          <img src="img/product/product2.jpg" alt="Infustion Herboriste" />
          <h3>Infusion Herboriste</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <section className="price">
            <p>
              À partir de <strong>7,60€</strong>
            </p>
          </section>
          <a className="btn" href="index.html">
            Voir ce produit
          </a>
        </article>
        <article id="crush">
          <h2>
            <span>Notre coup de coeur</span>
          </h2>
          <img src="img/product/product3.jpg" alt="Blue of London" />
          <h3>Blue of London</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <section className="price">
            <p>
              À partir de <strong>9,00€</strong>
            </p>
          </section>
          <a className="btn" href="product.html">
            Voir ce produit
          </a>
        </article>
      </section>
    </main>
  );
};
export default Main;
