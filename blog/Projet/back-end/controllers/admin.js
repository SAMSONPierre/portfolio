import { Article } from "../config/database.js";
import formidable from "formidable";
import fs from "fs";

export const AddPost = (req, res) => {
  // récupération des catégories depuis la bdd

  Article.distinct("category", () => {
    res.render("layout", { template: "add_post" });
  });
};

export const AddPostSubmit = async (req, res) => {
  console.log("salut");
  // récupération des données du formulaire dans req.body
  // on utilise les name des inputs comme clés dans req.body

  // const form = formidable();

  // form.parse(req, (err, fields, files) => {
  //   let oldPath = files.image.filepath;
  //   let newPath = "public/img/" + files.image.originalFilename;
  //   let pathBdd = "img/" + files.image.originalFilename;

  //   let article = new Article();
  //   article.title = fields.title;
  //   article.description = fields.content;
  //   article.category = fields.category;
  //   article.date = new Date();

  //   if (files.image.originalFilename) {
  //     article.images.push({
  //       src: pathBdd,
  //       alt: fields.title,
  //     });

  //     fs.copyFile(oldPath, newPath, (err) => {
  //       if (err) throw err;
  //     });
  //   }

  //   article.save(() => {
  //     return res.status(200).json({ message: "OK" });
  //   });
  //   return res.status(404).json({ message: res });
  // });

  let newArticle = req.body;
  try {
    let article = await Article.insertMany(newArticle);
    if (!article) {
      return res.status(404).json({ message: "No article found" });
    }
    return res.status(200).json(newArticle);
  } catch (err) {
    return console.log(err + "salut");
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
