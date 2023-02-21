import express from "express";
import {
  getAllUsers,
  newUser,
  deleteUser,
  LoginUser,
  Logout,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.post("/signup", newUser);
userRouter.delete("/delete/:id", deleteUser);
userRouter.post("/login", LoginUser);
userRouter.get("/logout", Logout);

export default userRouter;
