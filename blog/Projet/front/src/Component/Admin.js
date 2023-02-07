const Admin = () => {
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
      </table>
    </main>
  );
};

export default Admin;
