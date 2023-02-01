import mongoose from "mongoose";

//TODOparamétrez ici la connexion à votre base de données
mongoose.connect('mongodb://pseudo:password@mongodb.3wa.io:27017/db?authSource=admin');

mongoose.connection.on("error", () => {
  console.log("Erreur lors de la connexion à la base de données");
})

mongoose.connection.on("open", () => {
  console.log("Connexion à la base de données établie");
})

let ArticleSchema = mongoose.Schema({
  title:String,
  description:String,
  category:String,
  date:Date,
  comments:[{
    pseudo:String,
    comment:String,
    date:Date
  }],
  images:[{
    src:String,
    alt:String
  }]
});

let Article = mongoose.model("Article", ArticleSchema);

export default Article;