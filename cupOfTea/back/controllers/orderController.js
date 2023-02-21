import Order from "../models/ordermodels.js";
import Tea from "../models/teaModels.js";

//Trouver toutes les commandes
export const getAllOrder = async (req, res) => {
  try {
    let order = await Order.find();

    if (!order) {
      return res.status(404).json({ message: "No User Found" });
    }

    return res.status(200).json(order);
  } catch (err) {
    return console.log(err);
  }
};

//Supprimer une commande
export const deleteOrder = async (req, res) => {
  let id = req.params.id;
  try {
    let order = await Order.deleteOne({ _id: id });
    if (!order) {
      return res.status(404).json({ message: "No User Found" });
    }
    return res.status(200).json(order);
  } catch (err) {
    return console.log(err);
  }
};

//Editer une commande
export const editOrder = async (req, res) => {
  let id = req.params.id;
  try {
    let order = await Order.updateOne({ id }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!order) {
      return res.status(404).json({ message: "No User Found" });
    }
    return res.status(200).json(order);
  } catch (err) {
    return console.log(err);
  }
};

//Valider une commande
export const validOrder = async (req, res) => {};

export const addOrder = async (req, res) => {
  let newOrder = req.body;
  console.log(newOrder);
  try {
    let order = await Order.insertMany(newOrder);
    console.log(order);
    if (!order) {
      return res.status(404).json({ message: "No User Found" });
    }

    return res.status(200).json(newOrder);
  } catch (err) {
    return console.log(err);
  }
};
