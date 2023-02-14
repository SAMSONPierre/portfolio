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
  console.log(req.body);
  cloudinary.config({
    cloud_name: "dqkdjkmtc",
    api_key: "922325493222328",
    api_secret: "VMwzbmapipXnXc6XHxHNIi5A5sY",
  });

  cloudinary.uploader.upload(req.body.image).then(console.log("result"));

  let newArticle = req.body;
  try {
    let article = await Article.insertMany(newArticle);
    if (!article) {
      return res.status(404).json({ message: "No article found" });
    }
    return res.status(200).json(newArticle);
  } catch (err) {
    return console.log(err);
  }
};

export const DeletePost = (req, res) => {
  let id = req.params.id;

  Article.deleteOne({ _id: id }, () => {
    res.redirect("/admin");
  });
};

export const EditPost = (req, res) => {
  let id = req.params.id;
  Article.findOne({ _id: id }, (error, post) => {
    res.render("layout", { template: "edit_post", post: post });
  });
};

export const EditPostSubmit = (req, res) => {
  let id = req.params.id;
  Article.updateOne(
    { _id: id },
    {
      title: req.body.title,
      description: req.body.content,
      category: req.body.category,
    },
    () => {
      res.redirect("/admin");
    }
  );
};
