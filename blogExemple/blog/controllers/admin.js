import Article from "../config/database.js";

export const Admin =  (req, res) => {
     Article.find((err, posts)=> {
        
	        res.render('layout', {template: 'admin', posts: posts});
	});

}

export const AddPost = (req, res) => {
    
    // récupération des catégories depuis la bdd
    Article.distinct("category" ,(error, categories, fields) => {

        // appel du template layout avec add_post où on fait passer les infos auteurs et catégories
        res.render('layout', { template: 'add_post',categories: categories });
    });
}


export const AddPostSubmit = (req, res) => {
	
    // récupération des données du formulaire dans req.body 
	// on utilise les name des input comme clefs de req.body
	let article = new Article();
	article.title = req.body.title;
	article.description  = req.body.content;
	article.category = req.body.category;
	article.date = new Date();

	//enregistrement en base de données
	article.save(() =>  {
        
	        // une fois le post créé en BDD on redirige vers la page / (home)
	        res.redirect('/admin');
	});
}


export const DeletePost = (req, res) => {
    
	//on récupère l'id de l'article à supprimer, il a été passé en paramètre de l'url
    let id = req.params.id;

	Article.deleteOne({_id:id}, () => {
        res.redirect('/admin');
	 });
}

export const EditPost = (req, res) => {
    
	let id = req.params.id;

	Article.findOne({_id:id}, (error, post) => {
        // appel du template pour édition de post
	        res.render('layout', {template: 'edit_post', post: post});
	 });

}

export const EditPostSubmit = (req, res) => {
    
	let id = req.params.id;

	Article.updateOne({_id:id},{"title" : req.body.title, "description" : req.body.content}, () => {
        res.redirect('/admin');
	 });

}