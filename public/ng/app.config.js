

var appConfig  = (function () {
    ' use strict';

    var api = {
        protocol: 'http',
        server: 'localhost',
        port: 4000,
        baseUrl: '/api/v1',
    };

    var apiUrl = api.protocol + "://" + api.server + ":" + api.port + api.baseUrl;
    var apiLoginUrl = apiUrl.replace(api.baseUrl, "/login");




    var initInjector = angular.injector(['ng']);
    var $http = initInjector.get('$http');

    var app = angular.module("BTApp", [
        'base64',
        'angular-jwt',
        'ngRoute',
        'ngMessages',
        'ngAnimate',
        'oc.lazyLoad',
        'ui.router',
        'ngCookies',
        'angular-jwt'
    ]);
    app.factory('TokenInterceptor', function($q, $window,$location,$state) {
	  return {
		    request: function(config) {
		      config.headers = config.headers || {};
		      if ($window.sessionStorage.token) {
		        config.headers['X-Access-Token'] = $window.sessionStorage.token;
		        config.headers['X-Key'] = $window.sessionStorage.user;
		        config.headers['Content-Type'] = config.headers['Content-Type'] || "application/json";
		      }
		      return config || $q.when(config);
		    },
		 
		    response: function(response) {
		    	if(response.status === 401 || response.status === 403) {
	                ///$location.path('/login');
                    $state.go("home.login");
	            }
		      return response || $q.when(response);
		    }
		  };
		});
    app.config(['$ocLazyLoadProvider', '$routeProvider', '$stateProvider', '$urlRouterProvider', '$httpProvider', function ($ocLazyLoadProvider, $routeProvider, $stateProvider, $urlRouterProvider, $httpProvider) {
        $ocLazyLoadProvider.config({
            debug: false,
            events: true,
        });

         // $urlRouterProvider.otherwise('/dashboard/home');
        // $urlRouterProvider.otherwise('auth/login');

   

        $urlRouterProvider.otherwise('/home/dashboard');
        $httpProvider.defaults.withCredentials = true;
        $stateProvider
         .state('home', {
                templateUrl: 'ng/directive/home/home.directive.html',
                url: '/home',
                controller: "homeCtrl",
                resolve: {
                    loadMyDirectives: function ($ocLazyLoad) {
                        return $ocLazyLoad.load(
                            {
                                name: 'BTApp',
                                files: [
                                    'ng/directive/home/home.directive.js',
                                    'ng/controller/home.controller.js',
                                    'ng/factory/authFactory.factory.js',
                                    'js/timeCal.service.min.js',
                                    'ng/customDirective/headerMenu.directive.js'
                                        // 'ng/service/StoreService.service.js'
                                   
                                ]
                            });
                    },

                }
            }).state('home.dashboard', {
                templateUrl: 'ng/directive/dashboard/dashboard.directive.html',
                url: '/dashboard',
                hideSideBar: true,
                resolve: {
                    loadMyDirectives: function ($ocLazyLoad) {
                        return $ocLazyLoad.load({
                            name: 'BTApp',
                            files: [
                                'ng/directive/dashboard/dashboard.directive.js',
                                'ng/directive/dashboard/header/header.directive.js',
                                'ng/directive/dashboard/sidebar/sidebar.directive.js'
                                 
                                 
                            ]
                        }),
                            $ocLazyLoad.load(
                                {
                                    name: 'ngCookies',
                                    files: ['bower_components/angular-cookies/angular-cookies.js']
                                }),
                            $ocLazyLoad.load(
                                {
                                    name: 'ngResource',
                                    files: ['bower_components/angular-resource/angular-resource.js']
                                }),
                            $ocLazyLoad.load(
                                {
                                    name: 'ui.bootstrap',
                                    files: ['bower_components/angular-bootstrap/ui-bootstrap.min.js',
                                        'bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js'
                                    ]
                                });

                    }
                }
            }).state('home.dashboard.blank',{
		                templateUrl: 'ng/directive/dashboard/blank/blank.directive.html',
		                url: '/blank',
		                controller:"blankCtrl",
		                resolve: {
		                    loadMyDirectives: function ($ocLazyLoad) {
		                        return $ocLazyLoad.load(
		                            {
		                                name: 'BTApp',
		                                files: [
		                                    'ng/directive/dashboard/blank/blank.directive.js',
		                                    'ng/controller/blank.controller.js',
		                                    
		                                ]
		                            });
		                    	}
		               		}
		            }).state('home.login',{
		                templateUrl: 'ng/directive/auth/login/login.directive.html',
		                url: '/login',
		                controller:"loginCtrl",
		                resolve: {
		                    loadMyDirectives: function ($ocLazyLoad) {
		                        return $ocLazyLoad.load(
		                            {
		                                name: 'BTApp',
		                                files: [
		                                    'ng/directive/auth/login/login.directive.js',
		                                    'ng/controller/login.controller.js',
                                            'ng/factory/authFactory.factory.js'
		                                    
		                                ]
		                            });
		                    	}
		               		}
		            }).state('home.dashboard.upload',{
		                template: '<upload></upload>',
		                url: '/upload',
		                controller:"uploadCtrl",
		                resolve: {
		                    loadMyDirectives: function ($ocLazyLoad) {
		                        return $ocLazyLoad.load(
		                            {
		                                name: 'BTApp',
		                                files: [
		                                    'ng/directive/dashboard/upload/upload.directive.js',
		                                    'ng/controller/upload.controller.js',
                                            
		                                    
		                                ]
		                            });
		                    	}
		               		}
		            });
            $httpProvider.interceptors.push('TokenInterceptor');

    }]);
})();

