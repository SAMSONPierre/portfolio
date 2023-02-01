import Article from "../config/database.js";

export default (req, res) => {

    Article.find((err, posts)=> {
   
            // appelle du template layout.ejs 
            // on fait passer la variable template pour dire à layout.ejs quel template charger, dans notre cas home.ejs
            //on fait passer en paramètre les informations récupérées en BDD sous la variable posts
            res.render('layout', {template: 'home', posts: posts});
    });
}