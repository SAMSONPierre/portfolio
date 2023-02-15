import { useEffect, useState } from "react";

const Main = () => {
  const [liste, setListe] = useState([]);

  useEffect(() => {
    fetch("/getPost")
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        setListe(res);
      });
  }, []);

  return (
    <main>
      <h1>Home</h1>
      <p>
        Bienvenue sur mon portfolio ! Vous trouverez ici tous mes projets
        personnel et professionnel
      </p>
      <ul className="home-list">
        {liste.map((item) => (
          <li key={item._id}>
            <a href="/">{item.title}</a>
            <img src={item.images} alt={item.title} width="20%" />
            <p>{item.description.substring(0, 30)}...</p>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default Main;
