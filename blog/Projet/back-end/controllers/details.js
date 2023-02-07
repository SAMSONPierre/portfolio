import { Article } from "../config/database.js";

export const Details = (req, res) => {
  // Il y a plusieurs articles, on récupère un paramètre id dans l'URL pour exécuter notre requête sur le bon article

  let id = req.params.id;

  Article.findOne({ _id: id }, (error, post) => {});
};
