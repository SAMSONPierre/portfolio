import "./App.css";
import Header from "./Component/Header.js";
import Main from "./Component/Main.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Connexion from "./Controller/Connexion";

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
    </>
  );
}

export default App;
