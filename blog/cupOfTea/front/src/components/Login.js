const Login = () => {
  return (
    <>
      <form method="post">
        <label htmlFor="name">name</label>
        <input type="text" name="name" id="name" />
        <label htmlFor="pwd">Mot de passe</label>
        <input type="password" name="pwd" id="pwd" />
        <button>Se connecter</button>
      </form>
    </>
  );
};

export default Login;
