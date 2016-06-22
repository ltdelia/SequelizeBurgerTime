var Burger = require('../model/burger.js');

// Routing

module.exports = function(app){

	// Our home page. The app will get the path '/'. 
	// Sequelize will "SELECT * " from our table, then render the result in index.handlebars
	app.get('/', function(req, res){
		Burger.findAll({})
			.then(function(result){
				res.render('index', {result});
			})
	});	
	
	// Our API. The app will get the path '/api'.
	// Sequelize will "SELECT * " from our table, then respond with a JSON of our data
	app.get('/api', function(req, res){
		Burger.findAll({})
			.then(function(result){
				res.json(result);
			})
	});

	// When posting to the API, the app will receive a request
	app.post('/api', function(req, res){
		// This request will take the form of the object burger
		// When a user clicks "Order this burger!", we'll send the burger_name
		// When a user clicks "Devour It!", we'll send the id
		var burger = req.body;
		
		// We create a new burger when the burger_name is provided			
		Burger.create({
			id: burger.id,
			burger_name: burger.burger_name,
			devoured: burger.devoured,
			date: burger.date
		});

		// In order to update the table, we need to first "SELECT * "
		Burger.findAll({})
			.then(function(burgers){
				// ...loop through the array of burger objects...
				for(var i=0; i<burgers.length; i++){
					console.log("-------------------");
					console.log(burgers[i].id);
					console.log(burgers[i].burger_name);
					console.log(burgers[i].devoured);
					console.log(burgers[i].date);
					console.log("-------------------");
					// ...and if the id sent matches an id in the table...
					if(burger.id == burgers[i].id){
						// ...run an UPDATE to the table, setting devoured=true where the ids match
						Burger.update({
							devoured: true,
						},{ 
							where: {
								id: burger.id
							}
						});
					}
				}
			})
	});

}