import "./App.css";
import Header from "./Component/Header.js";
import Main from "./Component/Main.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Connexion from "./Controller/Connexion";
import Footer from "./Component/Footer";
import Admin from "./Component/Admin";
import NoAcces from "./Component/NoAcces";
import { useSelector } from "react-redux";

function App() {
  const idUser = useSelector((state) => state);
  return (
    <>
      <Header />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Connexion />} />

          {idUser.idUser === null || idUser.idUser === undefined ? (
            <Route path="/noacces" element={<NoAcces />} />
          ) : (
            <Route path="/admin" element={<Admin />} />
          )}
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
