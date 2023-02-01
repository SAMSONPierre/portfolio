import { useSelector } from "react-redux";

const Header = () => {
  const idUser  = useSelector((state) => state);
  
  return (
    <header className="blog-header">
      <div>
        <h1>
          <a href="/">Pierre Samson</a>
        </h1>
        <nav>
          <a href="/">
            <i className="fa fa-home"></i>Home
          </a>
          {idUser === null || idUser === undefined ? (
            <a href="/login">
              <i className="fa fa-cogs"></i> Se connecter
            </a>
          ) : (
            <div>
              <a href="/admin">
                <i className="fa fa-cogs"></i> Administration
              </a>
              <a href="/logout">
                <i className="fa fa-user"></i> Se déconnecter
              </a>
            </div>
          )} 
        </nav>
      </div>
    </header>
  );
};

export default Header;
