var Burger = require('../model/burger.js');

// Routing

module.exports = function(app){
	app.get('/', function(req, res){
		Burger.findAll({})
			.then(function(result){
				res.render('index', {result});
			})
	});	
	
	app.get('/api', function(req, res){
		Burger.findAll({})
			.then(function(result){
				res.json(result);
			})
	});

	app.post('/api', function(req, res){
		var burger = req.body;

	// How to check to see if burger already exists?
	
		Burger.create({
			id: burger.id,
			burger_name: burger.burger_name,
			devoured: burger.devoured,
			date: burger.date
		});

		// Burger.update({
		// 	devoured: true,
		// },{ 
		// 	where: {
		// 		burger_name: burger
		// 	}
		// });

	});

}