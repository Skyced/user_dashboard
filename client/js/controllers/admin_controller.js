myApp.controller('adminController', function(userFactory) {
	var that = this;

	var authentication = function() {
		userFactory.authenticate(function(data){
			console.log(data);
		})
	}
	authentication();
	
	var getAllUsers = function(){
		userFactory.getAllUsers(function(data){
			console.log(data);
			that.users = data;
		})
	}
	getAllUsers();

	this.createUser = function() {
		console.log(this.newUser)
		userFactory.newUser(this.newUser, function(data){
			that.message = data;
		})
	}
})