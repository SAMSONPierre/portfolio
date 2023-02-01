import express from "express";

const router = express.Router();

//appel de mes controllers
import HomeController from "../controllers/home.js";
import { AddComment, Details } from "../controllers/details.js";
import {
  AddPost,
  AddPostSubmit,
  DeletePost,
  EditPost,
  EditPostSubmit,
} from "../controllers/admin.js";
import { LoginSubmit, Logout } from "../controllers/login.js";

// ADD POST
router.get("/add_post", AddPost);

// ADD POST SUBMIT
router.post("/add_post", AddPostSubmit);

// DELETE POST
router.get("/delete_post/:id", DeletePost);

// EDIT POST
router.get("/edit_post/:id", EditPost);

// EDIT POST SUBMIT
router.post("/edit_post/:id", EditPostSubmit);

// ADD COMMENTS
router.post("/add_comment/:id", AddComment);

// AUTHENTIFICATION SUBMIT

router.post("/login", LoginSubmit);

// DECONNEXION

router.get("/logout", Logout);

export default router;
