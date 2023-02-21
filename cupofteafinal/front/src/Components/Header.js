import Nav from './Nav';
import Cart from './Cart';

const Header = () => {

    return(
        <header>
        <img className="ribbon" src="/img/ribbon.svg" alt="élu meilleur thé en 2016" />
        <section id="topbar">Livraison offerte à partir de 65€ d'achat !</section>
        <div className="container">
          <section id="logo">
            <a href="/">
              <img src="/img/logo.png" alt="Logo de Cup of Tea" />
            </a>
            <Cart />
          </section>
          <Nav />
        </div>
      </header>
 
    )
}


export default Header;