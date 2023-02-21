import { Project } from "../config/database.js";
import { v2 as cloudinary } from "cloudinary";

export const GetPost = async (req, res) => {
  try {
    let project = await Project.find();
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
    let project = new Project();
    project.title = req.body.title;
    project.description = req.body.description;
    project.category = req.body.category;
    project.images = req.body.image;
    project.github = req.body.git;
    project.date = new Date();

    project.save();
  });
};

export const DeletePost = (req, res) => {
  let id = req.params.id;

  Project.deleteOne({ _id: id }, (error, post) => {
    return res.status(200).json(post);
  });
};
