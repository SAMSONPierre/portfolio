import { Project } from "../config/database.js";
import { v2 as cloudinary } from "cloudinary";

// Requpête api pour obtenir la liste de tout les projets
export const GetPost = async (req, res) => {
  try {
    // On fait un Project.find() pour avoir la liste de tout les projets
    let project = await Project.find();
    return res.status(200).json(project);
  } catch (err) {
    return console.log(err);
  }
};

// Requête api pour ajouter un article
export const AddPostSubmit = async (req, res) => {
  // On configure le cloudinary, normalement bien évidemment les informations ne sont pas en clair comme
  // cela, ce sont des données protégé. J'y est mis les configurations d'un cloudinary poubelle
  cloudinary.config({
    cloud_name: "dqkdjkmtc",
    api_key: "922325493222328",
    api_secret: "VMwzbmapipXnXc6XHxHNIi5A5sY",
  });

  // On envoie l'image sur cloudinary, on en récupère le lien de l'image que l'on va donner à la BDD
  // On récupêre dans le req.body les informations pour pouvoir les définir dans la BDD
  cloudinary.uploader.upload(req.body.image).then((response) => {
    let project = new Project();
    req.body.image = response.url;
    project.title = req.body.title;
    project.description = req.body.description;
    project.category = req.body.category;
    project.images = req.body.image;
    project.github = req.body.git;
    project.date = new Date();

    // On sauvegarde le nouveau projet dans la base de donnée
    project.save();
  });
};

// Requête api pour supprimer un projet
export const DeletePost = (req, res) => {
  // On récupère l'id du projet à supprimer dans le params
  let id = req.params.id;
  // Requête mongo pour supprimer le projet
  Project.deleteOne({ _id: id }, (error, post) => {
    return res.status(200).json(post);
  });
};
