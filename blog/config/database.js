import mongoose from "mongoose";
import bcrypt from "bcrypt";

//connexion à la base de données
mongoose.connect("mongodb://0.0.0.0:27017/db");

mongoose.connection.on("error", () => {
  console.log("Erreur lors de la connexion à la base de données");
});

mongoose.connection.on("open", () => {
  console.log("Connexion à la base de données établie");
});

let ArticleSchema = mongoose.Schema({
  title: String,
  description: String,
  category: String,
  date: Date,
  comments: [
    {
      pseudo: String,
      comment: String,
      date: Date,
    },
  ],
  images: [
    {
      src: String,
      alt: String,
    },
  ],
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
