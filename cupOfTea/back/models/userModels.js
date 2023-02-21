import mongoose from "mongoose";
// import bcrypt from "bcrypt";

//Schema database de l'utilisateur
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  dateOfCreation: Date,
  isAdmin: Boolean,
  order: Array,
  grades: Array,
});

let User = mongoose.model("userteadbs", userSchema);
export default User;
