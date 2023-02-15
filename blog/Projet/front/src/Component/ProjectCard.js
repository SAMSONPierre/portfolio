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
      <p>salut</p>
    </>
  );
};

export default ProjectCard;
