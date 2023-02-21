import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const Header = () => {
  const idUser = useSelector((state) => state);
  const dispatch = useDispatch();

  const submit = (e) => {
    e.preventDefault();
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
              <i className="fa fa-cogs"></i> Admin
            </a>
            <a href="https://github.com/ThomasThoams" target="_blank">
              <i class="fa fa-github"></i> Github
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
            <a href="/" onClick={submit}>
              <i className="fa fa-user"></i> Se déconnecter
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
