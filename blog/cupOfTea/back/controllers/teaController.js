import Tea from "../models/teaModels.js";

//trouver tout les thés
export const getAllTea = async (req, res) => {
  try {
    let tea = await Tea.find();

    if (!tea) {
      return res.status(404).json({ message: "No User Found" });
    }
    return res.status(200).json(tea);
  } catch (err) {
    return console.log(err);
  }
};

//ajouter un thé
export const addTea = async (req, res) => {
  let newTea = req.body;
  console.log(newTea);
  try {
    let tea = await Tea.insertMany(newTea);

    if (!tea) {
      return res.status(404).json({ message: "No User Found" });
    }

    return res.status(200).json(newTea);
  } catch (err) {
    return console.log(err);
  }
};

//éditer un thé
export const editTea = async (req, res) => {
  let id = req.params.id;
  try {
    let tea = await Tea.updateOne({ id }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!tea) {
      return res.status(404).json({ message: "No User Found" });
    }
    return res.status(200).json(tea);
  } catch (err) {
    return console.log(err);
  }
};

//supprimer un thé
export const deleteTea = async (req, res) => {
  let id = req.params.id;
  try {
    let tea = await Tea.deleteOne({ _id: id });
    if (!tea) {
      return res.status(404).json({ message: "No User Found" });
    }
    return res.status(200).json(tea);
  } catch (err) {
    return console.log(err);
  }
};
