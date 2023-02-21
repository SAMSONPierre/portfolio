import mongoose from "mongoose";

//Schema database des thés
const teaSchema = new mongoose.Schema({
  name: String,
  type: String,
  price: Number,
  stock: Number,
  description: String,
  sales: Number,
  greatVintage: Boolean,
  image: String,
  grades: {
    commentary: String,
    score: Number,
  },
});

export default mongoose.model("teadbs", teaSchema);
