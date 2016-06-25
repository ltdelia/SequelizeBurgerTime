var Sequelize = require("sequelize");
var source = {

    localhost: {
        port: 3306,
        host: 'localhost',
        user: 'nodeuser',
        password: "nodepassword",
        database: "burgers_db"
    },

    jawsDB: {
        port: 3306,
        host: 'bqmayq5x95g1sgr9.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user: 'ts6mwp2i0ag5as1t',
        password: 'laa1ba2hxpjhbf6d',
        database: 'ou67nsyiorndkclh'
    }
};

var selectedSource = source.jawsDB;

// Creating mySQL connection with Sequelize
var sequelize = new Sequelize(selectedSource.database, selectedSource.user, selectedSource.password, {
    host: selectedSource.host,
    dialect: 'mysql',
    
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }

});

module.exports = sequelize;