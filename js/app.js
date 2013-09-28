var smApp = angular.module('smApp',['ui.date','ui.bootstrap','ui.keypress','ngRoute']);

//Routing
smApp.config(function ($routeProvider) {
    $routeProvider
        .when('/',
            {
                controller: 'appController',
                templateUrl: 'partials/home.html'
            })
        .otherwise({ redirectTo: '/' });
});

//controller
smApp.controller('appController', function($scope){

	$scope.taskList = [];
	$scope.task;
	$scope.taskDetail;
	$scope.deadLine;
	$scope.alerts = [];
	$scope.searchText;
	
  	//Initializer
	init();
	function init(){
		
		
	};
	
});