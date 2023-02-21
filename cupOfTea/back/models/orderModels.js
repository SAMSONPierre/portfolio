import mongoose from "mongoose";

//Schema database de la commande
const orderSchema = new mongoose.Schema({
  tea: {
    type: mongoose.Types.ObjectId,
    ref: "teadbs",
  },
  price: Number,
  valid: Boolean,
  date: Date,
});

export default mongoose.model("orderteadbs", orderSchema);
