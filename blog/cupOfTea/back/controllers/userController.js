import User from "../models/userModels.js";
import bcrypt from "bcrypt";

//trouver tout les utilisateurs
export const getAllUsers = async (req, res) => {
  try {
    let user = await User.find();

    if (!user) {
      return res.status(404).json({ message: "No User Found" });
    }

    return res.status(200).json(user);
  } catch (err) {
    return console.log(err);
  }
};

// Création d'un utilisateur
export const newUser = async (req, res) => {
  let pwd = req.body.password;
  bcrypt.hash(pwd, 1, (err, result) => {
    let newUser = new User({
      name: req.body.name,
      password: result,
      email: req.body.email,
      dateOfCreation: req.body.date,
      order: req.body.order,
      grades: req.body.grades,
    });
    console.log(newUser);
    newUser.save();
    return res.status(200).json(newUser);
  });
};

//Supprimer un utilisateur
export const deleteUser = async (req, res) => {
  let id = req.params.id;
  try {
    let user = await User.deleteOne({ _id: id });
    if (!user) {
      return res.status(404).json({ message: "No User Found" });
    }
    return res.status(200).json(user);
  } catch (err) {
    return console.log(err);
  }
};

//vérification des logs
export const LoginUser = (req, res) => {
  User.findOne({ name: req.body.name }, (err, user) => {
    if (user) {
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        console.log(result);
        if (result) {
          req.session.isAdmin = true;
          return res.status(200).json(user);
        } else {
          return res.status(404).json({ message: "Incorrect pwd" });
        }
      });
    }
  });
};

//Logout
export const Logout = (req, res) => {
  console.log(req.session);
  req.session.destroy();
  return res.status(200).json({ message: "Déconnecté" });
};
