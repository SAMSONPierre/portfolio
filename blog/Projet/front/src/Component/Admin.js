import { useEffect, useState } from "react";

const Admin = () => {
  const [liste, setListe] = useState([]);

  useEffect(() => {
    fetch("/getPost")
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        setListe(res);
      });
  }, []);

  function deleteOnClick(id) {
    let req = new Request(`/deletePost/${id}`, {
      method: "DELETE",
    });

    console.log(id);
    fetch(req)
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        window.location.reload();
      });
  }

  return (
    <main>
      <h1>Admin</h1>
      <a className="back" href="/add_project">
        Ajouter un article
      </a>
      <table>
        <thead>
          <tr>
            <th>Titre</th>
            <th>Article</th>
            <th>Catégorie</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {liste.map((item) => (
            <tr>
              <td>
                <a href={`/project/${item._id}`}>{item.title}</a>
              </td>
              <td>{item.description.substring(0, 30)}...</td>
              <td>{item.category}</td>
              <td>
                <a
                  className="remove"
                  href="/"
                  onClick={(e) => {
                    e.preventDefault();
                    deleteOnClick(item._id);
                  }}
                >
                  <i className="fa fa-remove"></i>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default Admin;
