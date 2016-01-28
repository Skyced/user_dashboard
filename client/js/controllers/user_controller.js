myApp.controller('userController', function(userFactory) {
	console.log('[Usercontroller] loaded');
	var that = this;

	var LoadUserProfile = function() {
		userFactory.LoadUserProfile(function(data){
			console.log(data);
			that.UserProfile = data
		})
	}
	LoadUserProfile();

	var LoadMessages = function() {
		userFactory.FetchMessages(function(data){
			that.user_messages = data
		})
	}

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

	this.addNewMessage = function() {
		console.log(this.Message)
		userFactory.AddNewMessage(this.Message, function(data){
			that.messageStatus = data
		})
	}
})