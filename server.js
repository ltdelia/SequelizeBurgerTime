var express = require('express');
var expressHandlebars = require('express-handlebars');
var methodOverride = require('method-override');
var bodyParser = require('body-parser');

var app = express();

var PORT =process.env.PORT || 3000;

// setting up handlebars
app.engine('handlebars', expressHandlebars({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

// BodyParser makes it easy for our server to interpret data sent to it.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

// require our controller here -- ties it all together
require('./controllers/burgers_controller.js')(app);

app.listen(PORT);