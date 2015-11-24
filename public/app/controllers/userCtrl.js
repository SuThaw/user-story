angular
	.module('userCtrl',['userService'])
	.controller('UserController',function(User,$location,$window){
		var vm = this;
		
		// User
		// 	.all()
		// 	.success(function(data){
		// 		vm.users = data;
		// 	});


		vm.signUpUser = function(){

			console.log('what');
			vm.message = '';
			User
				.create(vm.userData)
				.then(function(response){
					vm.useData = {};
					vm.message = response.data.message;	
					
					$window.locationStorage.setItem('token',response.data.token);
					$location.path('/');
				})

		};
	});