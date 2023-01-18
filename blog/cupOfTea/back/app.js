import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import session from "express-session";
import teaRoutes from "./routes/teaRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import userRoutes from "./routes/userRoutes.js";

//Connexion du back
const app = express();
const PORT = process.env.PORT || 8080;
const hostname = "localhost";
const BASE_URL = `http://${hostname}:${PORT}`;
app.listen(PORT, console.log(`Server started on port ${BASE_URL}`));

//Connection à la base de données mongoDB Compass
mongoose.connect("mongodb://0.0.0.0:27017/tea");
mongoose.connection.on("error", () => {
  console.log("Connexion impossible à la base de données");
});
mongoose.connection.on("open", () => {
  console.log("Connexion établie avec la base de données");
});

//Utilisation de cors pour régler les problèmes de CORS
app.use(cors());
app.options("*", cors());

//pour l'utilisation du json à la réception des données formulaire
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialisation du système de session
app.use(
  session({
    secret: "mySecret",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 3600000 },
  })
);

//appel des routeur
app.use("/api/tea", teaRoutes);
app.use("/api/user", userRoutes);
app.use("/api/order", orderRoutes);
