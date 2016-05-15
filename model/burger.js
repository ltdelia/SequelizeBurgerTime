// Dependencies

// Sequelize = standard library in the npm
var Sequelize = require('sequelize');

// sequelize = the exported connection from connection.js
var sequelize = require('../config/connection.js');

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
}, {
	timestamps: false
});

Burger.sync();

module.exports = Burger;