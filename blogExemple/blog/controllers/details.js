import Article from "../config/database.js";

export const Details =  (req, res) => {
   // il y a plusieurs article on récupère un paramètre id dans l'url pour pouvoir executer la bonne requête sql en fonction du bon article
	let id = req.params.id;

	Article.findOne({_id:id}, function (error, post) {
        res.render('layout', {template: 'article', post: post});
	 });
}

export const AddComment =  (req, res) => {
    let id = req.params.id;
    
    //création de l'objet commentaire qui sera ajouté aux commentaires existants
	let comment = {
		pseudo:req.body.pseudo,
	    comment:req.body.content,
	    date:new Date()
	};
	
	//mise à jour de l'article avec rajout du commentaire
	Article.update({_id:id}, { $push : { comments: comment} }, () => {
		res.redirect('/article/'+id);
	})

}

