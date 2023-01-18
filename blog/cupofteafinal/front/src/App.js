import "./App.css";
import Home from "./Controller/Home";
import Teas from "./Controller/Teas";
import Histoire from "./Controller/Histoire";
import Tea from "./Controller/Tea";
import Connexion from "./Controller/Connexion";
import Deconnexion from "./Controller/Deconnexion";
import MonCompte from "./Controller/MonCompte";
import CreateAccount from "./Controller/CreateAccount";
import Admin from "./Controller/admin/Admin";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Cart from "./Controller/Cart";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    return (
        <>
            <Header />
            <main className="container">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/teas" element={<Teas />} />
                        <Route path="/histoire" element={<Histoire />} />
                        <Route path="/tea/:id" element={<Tea />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route
                            path="/createAccount"
                            element={<CreateAccount />}
                        />
                        <Route path="/connexion" element={<Connexion />} />
                        <Route path="/deconnexion" element={<Deconnexion />} />
                        <Route path="/moncompte" element={<MonCompte />} />
                        <Route path="/admin" element={<Admin />} />
                    </Routes>
                </BrowserRouter>
            </main>
            <Footer />
        </>
    );
}

export default App;
