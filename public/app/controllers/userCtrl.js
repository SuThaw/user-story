angular
	.module('userCtrl',['userService'])
	.controller('UserController',function(User){
		var vm = this;
		
		User
			.all()
			.success(function(data){
				vm.users = data;
			});

	})
	.controller('UserCreateController',function(User,$location,$window){

	});