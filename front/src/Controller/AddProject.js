import { useState } from "react";

const AddProject = () => {
  // useState de l'input pour le titre
  const [title, setTitle] = useState("");
  // useState de l'input pour la description
  const [description, setDescription] = useState("");
  // useState de l'input pour la catégorie
  const [category, setCategory] = useState("");
  // useState de l'input pour le lien github
  const [git, setGit] = useState("");
  // useState de l'input pour l'image
  const [file, setFile] = useState();
  // useState du fichier en base64 à envoyer pour cloudinary
  const [fileBDD, setFileBDD] = useState();

  const handleChange = (e) => {
    // Switch des setters des inputs
    switch (e.target.id) {
      case "title":
        setTitle(e.target.value);
        break;
      case "description":
        setDescription(e.target.value);
        break;
      case "category":
        setCategory(e.target.value);
        break;
      case "image":
        setFile(e.target.files[0]);
        console.log(e.target.files[0]);
        console.log(file);
        break;
      case "git":
        setGit(e.target.value);
        break;
      default:
        return "";
    }
  };

  const submit = (e) => {
    // on empêche le realod de la page au submit
    e.preventDefault();

    // On passe en base 64 l'image choisit
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // On set le résultat
      setFileBDD(reader.result);
    };

    // On regroupe la data dans un tableau pour l'envoyer au back
    let datas = {
      title: title,
      description: description,
      category: category,
      git: git,
      image: fileBDD,
    };

    // On configure la requête
    let req = new Request("/addPost", {
      method: "POST",
      body: JSON.stringify(datas),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    // On envoie la requête
    // Pour l'instant il y a un problème sur l'envoi de la requête, il faut envoyer 2 fois la requête
    fetch(req).then((response) => {
      console.log("salut");
      response.json();
    });
  };

  return (
    <main>
      <h1>Ajouter un projet</h1>
      <form>
        <label>Titre du projet</label>
        {/* input du titre du projet */}
        <input type="text" id="title" value={title} onChange={handleChange} />
        <label>Contenue du projet</label>
        {/* Textarea pour la description */}
        <textarea
          id="description"
          value={description}
          onChange={handleChange}
        ></textarea>
        {/* input pour l'image */}
        <input type="file" id="image" onChange={handleChange} />
        <label>Catégorie</label>
        {/* input pour la catégorie */}
        <input
          type="text"
          id="category"
          value={category}
          onChange={handleChange}
        />
        <label>Github</label>
        {/* input pour le lien github */}
        <input type="text" id="git" value={git} onChange={handleChange} />
        {/* input pour envoyer le formulaire */}
        <input type="submit" name="Publier" onClick={submit} />
      </form>
    </main>
  );
};

export default AddProject;
