myApp.controller('userController', function(userFactory) {
	console.log('[Usercontroller] loaded');
	var that = this;

	this.createUser = function() {
		console.log(this.newUser)
		userFactory.newUser(this.newUser, function(data) {
			that.message = data;
			this.newUser = {}
		})

	}

	this.userLogin = function() {
		console.log(this.user)
		userFactory.Login(this.user, function(data){
			that.message = data;
			
		})
	}

})