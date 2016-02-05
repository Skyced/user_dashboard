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

	var fetchMessages = function() {
		userFactory.fetchMessages(function(data){
			that.userMessages = data
		})
	}
	fetchMessages();

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
			that.fetchMessages();
		})
	}

	this.newComment = function() {
		console.log(this.Comment)
		userFactory.newComment(this.newComment, function(data){

		})
	}
})