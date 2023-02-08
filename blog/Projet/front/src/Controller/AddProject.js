import { useState } from "react";

const AddProject = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");

  const handleChange = (e) => {
    switch (e.target.id) {
      case "title":
        setTitle(e.target.value);
        break;
      case "content":
        setContent(e.target.value);
        break;
      case "category":
        setCategory(e.target.value);
        break;
      default:
        return "";
    }
  };

  const submit = () => {
    let datas = {
      title: title,
      content: content,
      category: category,
    };
    alert(datas.title + datas.content + datas.category);
    let req = new Request("/add_post", {
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
        setContent("");
        setCategory("");
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
          id="content"
          value={content}
          onChange={handleChange}
        ></textarea>
        <input type="file" name="image" />
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
