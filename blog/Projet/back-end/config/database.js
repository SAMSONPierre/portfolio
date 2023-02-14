import mongoose from "mongoose";
import bcrypt from "bcrypt";

//connexion à la base de données
mongoose.connect(
  "mongodb+srv://Thomas:XhKnNiUrOCJWmocJ@cluster0.n7udm.mongodb.net/test"
);

mongoose.connection.on("error", () => {
  console.log("Erreur lors de la connexion à la base de données");
});

mongoose.connection.on("open", () => {
  console.log("Connexion à la base de données établie");
});

// // Replace the uri string with your connection string.
// const uri = "mongodb+srv://cluster0.n7udm.mongodb.net/myFirstDatabase";
// const client = new mongoose(uri);

let ArticleSchema = mongoose.Schema({
  title: String,
  description: String,
  category: String,
  images: String,
  date: Date,
});

let Article = mongoose.model("Article", ArticleSchema);

let UserSchema = mongoose.Schema({
  email: String,
  password: String,
  pseudo: String,
});

let User = mongoose.model("User", UserSchema);
bcrypt.hash("merci", 1, (err, result) => {
  let admin = new User({
    email: "admin@admin.fr",
    password: result,
    pseudo: "toto",
  });
  admin.save();
});

export { Article, User };
