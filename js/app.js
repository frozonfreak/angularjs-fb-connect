var smApp = angular.module('smApp',['ui.bootstrap','ngRoute','ngCookies', 'ngResource']);

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
smApp.service('Facebook',function($rootScope) {
        this.askFacebookForAuthentication = function(fail, success) {
            FB.login(function(response) {
            	console.log(response);					
                if (response.authResponse) {
                    FB.api('/me', function() { $rootScope.$apply(success) });
                } else {
                   $rootScope.$apply(function() {
                     fail('User cancelled login or did not fully authorize.')
                   });
                }
            });
        }
});

smApp.service('facebook', ['$rootScope', '$window', function ($rootScope, $window) {

  this.askFacebookForAuthentication = function (fail, success) {
    FB.login(function (response) {
      $rootScope.$apply(function () {
        if (response.authResponse) {
          FB.api('/me', success);
        } else {
          fail('User cancelled login or did not fully authorize.');
        }
      });
    });
  };

  this.getLoginStatus = function () {
    FB.getLoginStatus(function (response) {
      return response;
    });
  };

  this.FB = $window.FB;

}]);

/* --------------- FB API MODELS ------------------ */
smApp.service('FBUser', ['$log', '$rootScope', 'facebook', function ($log, $rootScope, facebook) {
  var that = this;

  this.authorized = false;

  facebook.FB.Event.subscribe('auth.authResponseChange', function (response) {
    $log.info("Event: auth.authResponseChange");
    if (response.authResponse) {
      if (response.status === 'connected') {
        // User logged in and authorized
        $log.info('User logged in and authorized');
        $rootScope.$apply(function () {
          that.authorized = true;
        });
        // DO WORK
      } else if (response.status === 'not_authorized') {
        // User logged in but has not authorized app
        $log.info('User logged in');
        $rootScope.$apply(function () {
          that.authorized = false;
        });
      } else {
        // User logged out
        $log.info('User logged out');
        $rootScope.$apply(function () {
          that.authorized = false;
        });
      }
    } else {
      $log.info('No valid authResponse found, user logged out');
      $rootScope.$apply(function () {
        that.authorized = false;
      });
    }
  });

  this.login = function (success, fail) {
    facebook.FB.login(function (response) {
      $rootScope.$apply(function () {
        if (response.authResponse) {
          console.log(response);
        } else {
          console.log('Login unsuccessful');
        }
      });
    });
  };

  this.logout = function () {
    facebook.FB.logout(function () {
      $rootScope.$apply(function () {
        that.authorized = false;
      });
    });
  };
}]);


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

smApp.controller('loginController', ['$scope', 'FBUser',function($scope, FBUser) {
  $scope.user = FBUser;
}]);

//Login Controller
smApp.controller('loginController1', function($scope, $cookies, $resource, Facebook){

	$scope.user = {}
    $scope.error = null;

    $scope.registerWithFacebook = function() {
        Facebook.askFacebookForAuthentication(
        function(reason) { // fail
            $scope.error = reason;
        }, function(user) { // success
            $scope.user = user
        });
    }
    
	
});
