import express from "express";

const router = express.Router();

//appel de mes controllers
import { Details } from "../controllers/details.js";
import { GetPost, AddPostSubmit, DeletePost } from "../controllers/admin.js";
import { LoginSubmit, Logout } from "../controllers/login.js";

// GET POST
router.get("/getPost", GetPost);

// ADD POST SUBMIT
router.post("/addPost", AddPostSubmit);

// DELETE POST
router.delete("/deletePost/:id", DeletePost);

// AUTHENTIFICATION SUBMIT

router.post("/login", LoginSubmit);

// DECONNEXION

router.get("/logout", Logout);

// Get one

router.get("/project/:id", Details);

export default router;
