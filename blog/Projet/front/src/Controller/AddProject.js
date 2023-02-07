const AddProject = () => {
  return (
    <main>
      <h1>Ajouter un projet</h1>
      <form>
        <label>Titre du projet</label>
        <input type="text" name="title" />
        <label>Contenue du projet</label>
        <textarea name="content"></textarea>
        <input type="file" name="image" />
        <label>Catégorie</label>
        <input type="text" name="category" />
        <input type="submit" name="Publier" />
      </form>
    </main>
  );
};

export default AddProject;
