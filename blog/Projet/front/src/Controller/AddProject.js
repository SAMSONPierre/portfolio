import { useState } from "react";

const AddProject = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState();
  const [fileBDD, setFileBDD] = useState();

  const handleChange = (e) => {
    switch (e.target.id) {
      case "title":
        setTitle(e.target.value);
        console.log(title);
        break;
      case "description":
        setDescription(e.target.value);
        break;
      case "category":
        setCategory(e.target.value);
        break;
      case "image":
        setFile(e.target.files[0]);
        console.log(file);
        break;
      default:
        return "";
    }
  };

  const submit = (e) => {
    e.preventDefault();

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setFileBDD(reader.result);
    };

    let datas = {
      title: title,
      description: description,
      category: category,
      image: fileBDD,
    };

    alert(datas.title + datas.description + datas.category);
    let req = new Request("/addPost", {
      method: "POST",
      body: JSON.stringify(datas),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });

    fetch(req)
      .then((response) => response.json())
      .then((response) => {
        setTitle("");
        setDescription("");
        setCategory("");
        console.log(response);
        alert(datas.image);
      });
  };

  return (
    <main>
      <h1>Ajouter un projet</h1>
      <form>
        <label>Titre du projet</label>
        <input type="text" id="title" value={title} onChange={handleChange} />
        <label>Contenue du projet</label>
        <textarea
          id="description"
          value={description}
          onChange={handleChange}
        ></textarea>
        <input type="file" id="image" onChange={handleChange} />
        <label>Catégorie</label>
        <input
          type="text"
          id="category"
          value={category}
          onChange={handleChange}
        />
        <input type="submit" name="Publier" onClick={submit} />
      </form>
    </main>
  );
};

export default AddProject;
