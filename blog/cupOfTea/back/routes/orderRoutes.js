import express from "express";
import {
  getAllOrder,
  deleteOrder,
  editOrder,
  validOrder,
  addOrder,
} from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.get("/", getAllOrder);
orderRouter.delete("/delete/:id", deleteOrder);
orderRouter.put("/edit/:id", editOrder);
orderRouter.post("/valide/:id", validOrder);
orderRouter.post("/add", addOrder);

export default orderRouter;
