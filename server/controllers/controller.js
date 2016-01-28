module.exports = (function(){
	return{
		authentication: function(req, res){
			if(!req.session.user) {
				return res.json(false)
			}
			else if(req.session.user.user_level < 9){
				return res.json(false)
			}
			return res.json(true)
		},
		createUser: function(req, res){
			console.log('req.body@createUser', req.body);
			
			var query = "SELECT * FROM users"
			connection.query(query, function(err, rows){
				if(err){
					console.log(err);
					return
				}
				console.log('Rows', rows);
				console.log(rows.length)
				bcrypt.genSalt(10, function(err, salt){
					bcrypt.hash(req.body.user_info.password, salt, function(err, hash){
						console.log(hash);
						if (rows.length == 0){
							var query = "INSERT INTO users (email, first_name, last_name, password, user_level, created_at, updated_at) VALUES ('"+req.body.user_info.email+"', '"+req.body.user_info.first_name+"', '"+req.body.user_info.last_name+"', '"+hash+"', 9, NOW(), NOW())"
						}
						else {
							var query = "INSERT INTO users (email, first_name, last_name, password, user_level, created_at, updated_at) VALUES ('"+req.body.user_info.email+"', '"+req.body.user_info.first_name+"', '"+req.body.user_info.last_name+"', '"+hash+"', 1, NOW(), NOW())"
						}
						connection.query(query, function (err, rows){
							if (err) {
								console.log(err)
								return
							}
							console.log('return to factory');
							return res.json('You have successfully registered');
						})
					})
				})	
			})
		},
		Login: function(req, res){
			console.log('Login', req.body)
			var query = "SELECT * FROM users WHERE email='"+req.body.user_info.email+"'"
			connection.query(query, function (err, rows){
				if (err){
					console.log(err)
					return
				}
				console.log(rows[0])
				bcrypt.compare(req.body.user_info.password, rows[0].password, function(err, result){
					if(err){
						console.log(err)
						return
					}
					if(result == true) {
						req.session.user = {};
						req.session.user.id = rows[0].id;
						req.session.user.user_level = rows[0].user_level;
					}
					return res.json({
										level: rows[0].user_level,
										status: result
									})
				})
			})
		},

		FetchAllUsers: function(req, res){
			if(req.session.user.user_level > 8){
				var query = "SELECT * FROM users"
				connection.query(query, function (err, rows){
					if(err){
						console.log('Error', err);
						return
					}
					console.log(rows)
					return res.json(rows)
				})
			}
		},

		FetchUsertoEdit: function(req, res){
			console.log(req.query);
			var query = "SELECT * FROM users WHERE id='"+req.query.user_id+"'"
			connection.query(query, function (err, rows){
				if(err){
					console.log(err)
					return
				}
				console.log(rows[0])
				return res.json(rows[0])
			})
		},

		UpdateUser: function(req, res){
			console.log('updateuser', req.body);
			var query = "UPDATE users SET email='"+req.body.email+"', first_name='"+req.body.first_name+"',last_name='"+req.body.last_name+"', user_level='"+req.body.user_level+"', updated_at=NOW() WHERE id='"+req.body.id+"'"
			connection.query(query, function(err, rows){
				if(err){
					console.log(err)
					return
				}
				console.log(rows)
				return res.json({})
			})
		},

		UpdatePassword: function(req, res){
			console.log('Password', req.body);
			console.log('params', req.params)
			bcrypt.genSalt(10, function(err, salt){
				bcrypt.hash(req.body.password, salt, function(err, hash){
					console.log(hash);
					var query = "UPDATE users SET password='"+hash+"' WHERE id='"+req.params.id+"'"
					connection.query(query, function (err, rows){
						if (err) {
							console.log(err)
							return
						}
						console.log('return to factory');
						return res.json('Password Updated');
					})
				})
			})	
		},

		FetchUserProfile: function(req, res){
			console.log(req.body, req.params)
			var query = "SELECT * FROM users WHERE id='"+req.params.id+"'";
			connection.query(query, function(err, rows){
				if (err) {
					console.log(err)
					return
				}
				console.log(rows)
				return res.json(rows[0])
			})
		},

		AddNewMessage: function(req, res){
			console.log('req.body',req.body)
			console.log('session',req.session.user.id)
			// var query = "INSERT INTO messages (content, created_at, updated_at, user_id) VALUES ('"+req.body.message+"', NOW(), NOW(), '"+req.session.user.id+"')"
			// connection.query(query, function(err, rows){
			// 	if (err) {
			// 		console.log('messageerror',err)
			// 		return
			// 	}
			// 	return res.json({})
			// })
		}
	}
})();