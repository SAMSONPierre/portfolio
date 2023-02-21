import express from "express";
import {
  getAllTea,
  addTea,
  editTea,
  deleteTea,
} from "../controllers/teaController.js";

const teaRouter = express.Router();

teaRouter.get("/", getAllTea);
teaRouter.post("/add", addTea);
teaRouter.put("/update/:id", editTea);
teaRouter.delete("/delete/:id", deleteTea);

export default teaRouter;
