# SequelizeBurgerTime
Create and devour burgers. Uses MySQL database with Sequelize.js, Express routing, Handlebars view engine, and Node.

# Introduction

BurgerTime is a Node app that utilizes MySQL, Express, and Handlebars. It allows a user to order a burger, then choose a burger to devour from the "Ready to Eat" section. Once a burger is devoured, it appears in the "Devoured" section. This app incorporates Sequelize.js as its ORM.

# Installation

To install, first clone the repo to a location on your computer. Then run:

```
npm install
```

This installs the following dependencies:

```
  "dependencies": {
    "body-parser": "^1.15.0",
    "express": "^4.13.4",
    "express-handlebars": "^3.0.0",
    "handlebars": "^4.0.5",
    "method-override": "^2.3.5",
    "sequelize": "^3.23.1"
  }
```

From here, navigate to the config folder, and open `connection.js`. This app uses a jawsDB cloud database by default. If you are looking to use the app with a local database, make sure to change the user and password inside the connection variable.

```
    localhost: {
        port: 3306,
        host: 'localhost',
        user: 'nodeuser',
        password: "nodepassword",
        database: "burgers_db"
    },

```

Sequelize.js takes care of creating a table based off of a provided Schema. You can read more about this in the section **The ORM**. If you wish to read more about setting up a table with a local connection, see below.

Open your SQL client, and run the following commands, found in `schema.sql` (inside the db folder):

```
create database burgers_db;
use burgers_db;

CREATE TABLE burgers(
  id int AUTO_INCREMENT NOT NULL,
  burger_name varchar(100),
  devoured boolean,
  date TIMESTAMP,
  PRIMARY KEY (id)
)
```

This will create your local instance of `burgers_db`, as well as the table `burgers`. 

You can then run the optional command (found in `seeds.sql`) to insert five burgers into `burgers`. 

```
INSERT INTO burgers(burger_name, devoured)
    VALUES
      ("Cheeseburger", true),
      ("Hamburger", false),
      ("Mushroom Burger", false),
      ("Veggie Burger", false),
      ("Philly Burger", false);
```

# The ORM

BurgerTime uses Sequelize to execute various SQL queries as needed by the application. In order to run queries, we define a Schema in `burger.js`, inside the model folder:

```
var Burger = sequelize.define("burger", {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	burger_name: {
		type: Sequelize.STRING
	},
	devoured: {
		type: Sequelize.BOOLEAN,
		defaultValue: false
	},
	date: {
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW
	}
}
```

BurgerTime uses three Sequelize methods, seen in `burgers_controller.js`.

`Burger.findAll({})`, which shows the entire table.

`Burger.create({})`, which inserts a burger into the table.

```
		Burger.create({
			id: burger.id,
			burger_name: burger.burger_name,
			devoured: burger.devoured,
			date: burger.date
		});
```

`Burger.update({})`, which sets devoured=true based on the respective id of the burger in the table.

```
		Burger.update({
			devoured: true,
		},{ 
			where: {
				id: burger.id
			}
		});
```

# Code Walkthrough

BurgerTime uses routing with Express. Routes are defined explicitly in `burgers_controller.js`. The app uses three particular routes:

1. A get route for `/`, rendering the home page. `Burger.findAll({})` is run here. 
2. A get route for `/api`, which displays a JSON of the database. `Burger.findAll({})` is also run here.
3. A post route for `/api`, which handles adding and updating the database. `Burger.create({})` and `Burger.update({})` are both run, depending on the request sent from `index.handlebars`.

When the server is initialized, `index.handlebars` is rendered. The page contains three areas of interest to the user:

1. An input to enter/order a burger.
2. A "Ready to Eat" section, displaying burgers available to devour.
3. A "Devoured" section, displaying the devoured burgers.

The input in the first column has an `id` `newBurger`, whose value is grabbed once a user clicks the "Order this burger!" button (which has the `id` `order`). A post request  is sent to `/api`, containing the user input.  

The following click event is executed:

```
$("#order").on('click', function(){
	
	var burger = {burger_name: $('#newBurger').val().trim()};

	var currentURL = window.location.origin;

	$.post(currentURL + '/api', burger)
		.done(function(data){
			console.log(data);
		})

	return false;
});
```

The post route in `burgers_controller.js` handles how the request will be treated. Since this request is sent as an object (`burger`) containing the value (`burger_name`), the `Burger.create({})` method is run: 

The "Ready to Eat" section displays the table (`result`), excluding any rows where `"devoured=true"`. Each row displays the `id` and `burger_name` of each burger, with a button that has the `id` of the burger.

```
<tbody>
	{{#each result}}
		{{#if this.devoured}}
		{{else}}
			<tr>
				<td>{{this.id}}</td>
				<td id="name" value={{this.burger_name}}>{{this.burger_name}}</td>
				<td><button id={{this.id}} type="submit" class="devour">Devour it!</button></td>
			</tr>
		{{/if}}
	{{/each}}
</tbody>
```

When a user clicks the "Devour It!" button, the following click event is executed: 

```
$(".devour").on('click', function(){

	var burger = {id: event.target.id};

	var currentURL = window.location.origin;

	$.post(currentURL + '/api', burger)
		.done(function(data){
			console.log(data);
		})

	return false;
})
```

Since this request is sent as an object (`burger`) containing the value (`id`), the following logic is run:

```
		Burger.findAll({})
			.then(function(burgers){
				for(var i=0; i<burgers.length; i++){
					if(burger.id == burgers[i].id){
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
```

The "Devoured" section displays any rows where `"devoured=true"`.

```
<tbody>
	{{#each result}}
		{{#if this.devoured}}
			<tr>
				<td>{{this.id}}</td>
				<td>{{this.burger_name}}</td>
			</tr>
		{{/if}}
	{{/each}}
</tbody>
```

# Running

To initialize the server locally and run the application, run the following command:

```
node server.js
```

# Deployed App

You can also see a deployed version of BurgerTime [here](http://sequelizeburgertime.herokuapp.com/). 

Enjoy!
