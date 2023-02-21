const Header = () => {
  return (
    <header>
      <img
        className="ribbon"
        src="img/ribbon.svg"
        alt="élu meilleur thé en 2016"
      />
      <section id="topbar">Livraison offerte à partir de 65€ d'achat !</section>
      <div className="container">
        <section id="logo">
          <a href="/">
            <img src="img/logo.png" alt="Logo de Cup of Tea" />
          </a>
          <section id="cart">
            <span>Mon panier</span>
            <strong>42,00€</strong>
          </section>
        </section>
        <nav>
          <a href="/listing">Thés</a>
          <a href="/">Grands crus</a>
          <a href="/">Accessoires</a>
          <a href="/">Epicerie</a>
          <a href="/about">Notre histoire</a>
          <a href="/Login">Se connecter</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
