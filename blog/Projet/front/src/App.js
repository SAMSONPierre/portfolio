import "./App.css";
import Header from "./Component/Header.js";
import Main from "./Component/Main.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Connexion from "./Controller/Connexion";
import Footer from "./Component/Footer";
import Admin from "./Component/Admin";
import NoAcces from "./Component/NoAcces";
import AddProject from "./Controller/AddProject";
import { useSelector } from "react-redux";
import ProjectCard from "./Component/ProjectCard";

function App() {
  const idUser = useSelector((state) => state);
  return (
    <>
      <Header />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Connexion />} />
          <Route path="/project/:id" element={<ProjectCard />} />
          {idUser.idUser === null || idUser.idUser === undefined ? (
            <Route path="/noacces" element={<NoAcces />} />
          ) : (
            <Route path="/admin" element={<Admin />} />
          )}
          {idUser.idUser === null || idUser.idUser === undefined ? (
            <Route path="/noacces" element={<NoAcces />} />
          ) : (
            <Route path="/add_project" element={<AddProject />} />
          )}
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
