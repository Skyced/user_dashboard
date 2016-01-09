myApp.factory('userFactory', function($http, $location, $routeParams){
	var factory = {};
	console.log('[USERFACTORY] Loaded');
	factory.authenticate = function(callback){
		$http.get('/admin').success(function(response){
			if(response == false) {
				$location.path('/user/sign')
			}
			else{
				callback(response);
			}
		})
	}

	factory.newUser = function(info, callback) {
		$http({
			url:'/user/create',
			method:'POST',
			data:{
				'user_info':info
			}
		})
		.success(function(data){
			console.log('callback',data)
			callback(data)
		})
	}

	factory.Login = function(info, callback) {
		$http({
			url:'/user/login',
			method:'POST',
			data: {
				'user_info': info
			}
		})
		.success(function(data){
			if (data.status == true && data.level == 9) {
				$location.path('/admin/show')
			}
			else if (data.status == true && data.level == 1) {
				$location.path('/user/show')
			}
			else{
				callback("Incorrect Password or Email")
			}
		})
	}

	factory.getAllUsers = function(callback) {
		$http.get('/admin/index').success(function(users){
			callback(users);
		})
	}

	var UserEdit;
	factory.editUser = function(user_id, callback){
		$http.get('/admin/edit', {
			params: { user_id: user_id }
		})
		.success(function(data){
			console.log(data);
			UserEdit = data;
			callback(data)
			$location.path('/admin/edit/'+user_id)
		})
	}

	factory.checkForEdit = function(callback){
		console.log(UserEdit);
		callback(UserEdit);
	}

	factory.updateInformation = function(user_info, callback) {
		$http.post('/admin/update/'+user_info.id, user_info).success(function(data){
			callback("Updated")
		})
	}

	factory.updatePassword = function(newPassword, callback){
		var id = $routeParams.user_id
		if(newPassword.password == newPassword.password_confirmation){
			console.log('HI');
			$http.post('/admin/update_password/'+id, newPassword).success(function(data){
				callback(data);
			})
		}
		else {
			callback("Passwords Do not Match");
		}
	}
	return factory
})