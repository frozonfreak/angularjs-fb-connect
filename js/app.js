var smApp = angular.module('smApp',['ui.date','ui.bootstrap','ui.keypress','ngRoute','ngCookies', 'ngGrid']);

//Routing
smApp.config(function ($routeProvider) {
    $routeProvider
        .when('/',
            {
                controller: 'appController',
                templateUrl: 'partials/home.html'
            })
        .when('/login',
            {
                controller: 'loginController',
                templateUrl: 'partials/login.html'
            })
        .otherwise({ redirectTo: '/' });
});
smApp.service('Facebook', function($q, $rootScope) {
  
  // resolving or rejecting a promise from a third-party
  // API such as Facebook must be
  // performed within $apply so that watchers get
  // notified of the change
  resolve = function(errval, retval, deferred) {
    $rootScope.$apply(function() {
      if (errval) {
        deferred.reject(errval);
      } else {
        retval.connected = true;
        deferred.resolve(retval);
      }
    });
  }
    
  return {
    getUser: function(FB) {
      var deferred = $q.defer();
      FB.getLoginStatus(function(response) {
        if (response.status == 'connected') {
          FB.api('/me', function(response) {
            resolve(null, response, deferred);
          });
        } else if (response.status == 'not_authorized') {
          FB.login(function(response) {
            if (response.authResponse) {
              FB.api('/me', function(response) {
                resolve(null, response, deferred);
              });
            } else {
              resolve(response.error, null, deferred);
            }
          });
        } 
      });
      promise = deferred.promise;
      promise.connected = false;
      return promise;
    },
    login:function(FB){
    	var deferred = $q.defer();
    	FB.login(function(response) {
            if (response.authResponse) {
              FB.api('/me', function(response) {
                resolve(null, response, deferred);
              });
            } else {
              resolve(response.error, null, deferred);
            }
          });
      promise = deferred.promise;
      promise.connected = false;
      return promise;
    }
  }; 
 });
//Home Controller
smApp.controller('appController', function($scope, $cookies){

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

//Login Controller
smApp.controller('loginController', function($scope, $cookies, Facebook){

	/*Example for Cookies
	$cookies.City = 'London';
    $scope.cookieValue = $cookies['City'];
    */
    $scope.user = Facebook.login(FB);
  	//Initializer
	init();
	function init(){
		
		
	};
	
});
