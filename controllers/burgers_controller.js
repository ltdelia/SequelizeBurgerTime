var Burger = require('../model/burger.js');

// Routing

module.exports = function(app){
	app.get('/index', function(req, res){
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
		Burger.create({
			id: burger.id,
			burger_name: burger.burger_name,
			devoured: burger.devoured,
			date: burger.date
		});
	});

	app.put('/api', function(req, res){
		// UPDATE burgers SET devoured=true WHERE burger_name=?
		var burger = req.body;
		console.log(burger);
		Burger.update({
			devoured: true,
		},{ 
			where: {
				burger_name: burger
			}
		});
	});
}