import express from "express";

const router = express.Router();

//appel de mes controllers
import { Details } from "../controllers/details.js";
import {
  GetPost,
  AddPostSubmit,
  DeletePost,
  EditPost,
  EditPostSubmit,
} from "../controllers/admin.js";
import { LoginSubmit, Logout } from "../controllers/login.js";

// GET POST
router.get("/getPost", GetPost);

// ADD POST SUBMIT
router.post("/addPost", AddPostSubmit);

// DELETE POST
router.delete("/deletePost/:id", DeletePost);

// EDIT POST
router.get("/edit_post/:id", EditPost);

// EDIT POST SUBMIT
router.post("/edit_post/:id", EditPostSubmit);

// AUTHENTIFICATION SUBMIT

router.post("/login", LoginSubmit);

// DECONNEXION

router.get("/logout", Logout);

// Get one

router.get("/project/:id", Details);

export default router;
