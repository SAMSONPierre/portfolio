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
        <h2>{project.title}</h2>
        <nav>
          <a href={project.github} target="_blank" rel="noreferrer">
            Github du projet
          </a>
        </nav>
        <img src={project.images} alt="image du projet" />
        <p>{project.description}</p>
      </section>
    </>
  );
};

export default ProjectCard;
