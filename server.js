var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');

app.use(express.static(__dirname + '/client'));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(session({
  secret: 'secrey key',
  resave: false, 
  saveUninitialized: false,
  cookie: {maxAge: 100000000}
}))

// MYSQL
var mysql = require('mysql');
connection = mysql.createConnection({
	user: 'root',
	password: 'root',
	database: 'user_dashboard_db'
})

connection.connect(function(err){
	if(err){
		console.log('error' + err.stack);
		return;
	}
	console.log('connected');
})

//BCRYPT
bcrypt = require('bcryptjs');

//ROUTES
require('./server/config/routes.js')(app);

//PORT
app.listen(8000, function(){
	console.log('On 8000');
})