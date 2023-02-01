import { User } from "../config/database.js";
import bcrypt from "bcrypt";

export const LoginSubmit = (req, res) => {
  // On va vérifier si l'utilisateur avec cet email existe en BDD ou pas
  User.findOne({ email: req.body.email }, (err, admin) => {
    // Si il existe
    if (admin) {
      bcrypt.compare(req.body.pwd, admin.password, (err, result) => {
        // Si le mot de passe est correct alors on créé la session et on redirige l'utilisateur vers le BO
        if (result) {
          req.session.isAdmin = true;
          return res.status(200).json({ message: "OK" });
        }
        // Sinon on affiche un message
        else {
          return res.status(404).json({ message: "identifiant incorect" });
        }
      });
    }
  });
};

export const Logout = (req, res) => {
  console.log(req.session);
  req.session.destroy();
  return res.status(200).json({ message: "Déconnecté" });
};
