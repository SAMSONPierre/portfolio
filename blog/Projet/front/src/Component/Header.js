const Header = () => {
  return (
    <header class="blog-header">
      <div>
        <h1>
          <a href="/">Pierre Samson</a>
        </h1>
        <nav>
          <a href="/">
            <i class="fa fa-home"></i>Home
          </a>
          {locals.isAdmin ? (
            <div>
              <a href="/admin">
                <i class="fa fa-cogs"></i> Administration
              </a>
              <a href="/logout">
                <i class="fa fa-user"></i> Se déconnecter
              </a>
            </div>
          ) : (
            <a>
              <a href="/login">
                <i class="fa fa-cogs"></i> Se connecter
              </a>
            </a>
          )}
        </nav>
      </div>
    </header>
  );
};

export default <Header />;
