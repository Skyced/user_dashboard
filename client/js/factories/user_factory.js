myApp.factory('userFactory', function($http, $location){
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
	return factory
})