angular
	.module('storyService',[])
	.factory('Story',function($http){
		var storyFactory = {};
		storyFcatory.createStory = function(storyData){
			return $http.post('/api/story',storyData);
		};

		storyFactory.allStory = function(){
			return $http.get('/api/story');
		};
	})