var methods = require('./../controllers/controller.js')

module.exports = function(app) {
	app.get('/admin', function(req, res){
		methods.authentication(req, res);
	})
	app.post('/user/create', function(req, res) {
		methods.createUser(req, res);
	})
	app.post('/user/login', function(req, res){
		methods.Login(req, res);
	})
	app.get('/admin/index', function(req, res){
		methods.FetchAllUsers(req, res);
	})
}