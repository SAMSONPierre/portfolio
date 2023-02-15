import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProjectCard = () => {
  const [project, setProject] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    fetch(`/project/${id}`)
      .then((response) => response.json())
      .then((res) => {
        console.log(res);
        setProject(res);
      });
  }, []);
  return (
    <>
      <section className="article-detail">
        <h1>{project.title}</h1>
        <img src={project.images} width="50%" />
        <p>{project.description}</p>
      </section>
    </>
  );
};

export default ProjectCard;
