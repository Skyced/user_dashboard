myApp.controller('adminController', function(userFactory) {
	var that = this;
	console.log('Admin Controller loaded')

	var authentication = function() {
		userFactory.authenticate(function(data){
		})
	}
	authentication();

	var getAllUsers = function(){
		userFactory.getAllUsers(function(data){
			that.users = data;
		})
	}
	getAllUsers();

	var checkForEdit = function() {
		userFactory.checkForEdit(function(data){
			that.UserToEdit = data;
		})
	}
	checkForEdit();

	this.createUser = function() {
		userFactory.newUser(this.newUser, function(data){
			that.message = data;
		})
	}

	this.fetchUserProfile = function(user_id){
		userFactory.fetchUserProfile(user_id, function(data){
			that.UserProfile = data;
		})
	}

	this.editUser = function(user_id) {
		userFactory.editUser(user_id, function(data){
			that.UsertoEdit = data
		})
	}

	this.updateInformation = function() {
		userFactory.updateInformation(this.UserToEdit, function(data){
			that.update_message = data;
			checkForEdit();
			console.log(that.update_message);
		})
	}

	this.updatePassword = function() {
		userFactory.updatePassword(this.newPassword, function(data){
			that.update_password_msg = data;
		})
	}
})