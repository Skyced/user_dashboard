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
	app.get('/admin/edit', function(req, res){
		methods.FetchUsertoEdit(req, res);
	})
	app.post('/admin/update/:id', function(req, res){
		methods.UpdateUser(req, res);
	})
	app.post('/admin/update_password/:id', function(req, res){
		methods.UpdatePassword(req, res);
	})
	app.get('/user/show/:id', function(req, res){
		methods.FetchUserProfile(req, res);
	})
	
	app.post('/user/message/:id', function(req, res){
		console.log('hi');
		methods.AddNewMessage(req, res);
	})
}