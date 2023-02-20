import { Article } from "../config/database.js";
import { v2 as cloudinary } from "cloudinary";

export const AddPost = (req, res) => {
  // récupération des catégories depuis la bdd

  Article.distinct("category", () => {
    res.render("layout", { template: "add_post" });
  });
};

export const GetPost = async (req, res) => {
  try {
    let project = await Article.find();
    return res.status(200).json(project);
  } catch (err) {
    return console.log(err);
  }
};

export const AddPostSubmit = async (req, res) => {
  cloudinary.config({
    cloud_name: "dqkdjkmtc",
    api_key: "922325493222328",
    api_secret: "VMwzbmapipXnXc6XHxHNIi5A5sY",
  });

  cloudinary.uploader.upload(req.body.image).then((response) => {
    req.body.image = response.url;
    console.log(req.body.image);
    let newArticle = req.body;
    console.log(req.body);

    let article = new Article();
    article.title = req.body.title;
    article.description = req.body.description;
    article.category = req.body.category;
    article.images = req.body.image;
    article.date = new Date();

    article.save();
  });
};

export const DeletePost = (req, res) => {
  let id = req.params.id;

  Article.deleteOne({ _id: id }, (error, post) => {
    return res.status(200).json(post);
  });
};
