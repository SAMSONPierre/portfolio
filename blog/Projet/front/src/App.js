import "./App.css";
import Header from "./Component/Header.js";
import Main from "./Component/Main.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Connexion from "./Controller/Connexion";
import Footer from "./Component/Footer";

function App() {
  return (
    <>
      <Header />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Connexion />} />
        </Routes>
      </BrowserRouter>
      <Footer/>
    </>
  );
}

export default App;
