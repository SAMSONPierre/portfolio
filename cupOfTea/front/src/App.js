import "./App.css";

import Header from "./components/Header.js";
import Main from "./components/Main.js";
import Footer from "./components/Footer.js";
import Listing from "./components/Listing.js";
import About from "./components/About.js";
// import Login from "./components/Login.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Router>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/listing" element={<Listing />} />
          <Route path="/about" element={<About />} />
          {/* <Route path="/login" element={<Login />} /> */}
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
