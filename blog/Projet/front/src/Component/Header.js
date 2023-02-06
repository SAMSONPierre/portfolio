import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const Header = () => {
  const idUser = useSelector((state) => state);
  const dispatch = useDispatch();

  console.log(idUser.idUser);
  if (idUser.idUser === null || idUser.idUser === undefined) {
    console.log("cest vrai");
  }

  const submit = () => {
    let req = new Request("/logout", {
      method: "GET",
    });

    fetch(req).then(
      dispatch({
        type: "DECONNECT_USER",
      })
    );
  };
  return (
    <header className="blog-header">
      {idUser.idUser === null || idUser.idUser === undefined ? (
        <div>
          <h1>
            <a href="/">Pierre Samson</a>
          </h1>
          <nav>
            <a href="/">
              <i className="fa fa-home"></i>Home
            </a>
            <a href="/login">
              <i className="fa fa-cogs"></i> Se connecter
            </a>
          </nav>
        </div>
      ) : (
        <div>
          <h1>
            <a href="/">Pierre Samson</a>
          </h1>
          <nav>
            <a href="/">
              <i className="fa fa-home"></i>Home
            </a>
            <a href="/admin">
              <i className="fa fa-cogs"></i> Administration
            </a>
            <a href="/logout" onClick={submit}>
              <i className="fa fa-user"></i> Se déconnecter
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
