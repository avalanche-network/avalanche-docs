'use strict';

/**
 * @ngdoc overview
 * @name avalancheDocsApp
 * @description
 * # avalancheDocsApp
 *
 * Main module of the application.
 */
angular
  .module('avalancheDocsApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ui.router',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'hljs',
    'jsonFormatter',
    'angularSpinner'
  ])
  .config(['$locationProvider', '$stateProvider', '$urlRouterProvider', '$httpProvider', function($locationProvider, $stateProvider, $urlRouterProvider, $httpProvider) {
    // Configs
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: true,
      rewriteLinks: true
    });
    //Enable cross domain calls
    $httpProvider.defaults.useXDomain = true;
    //Remove the header used to identify ajax call  that would prevent CORS from working
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
    // UI router
    $stateProvider
    .state('getting-started', {
      url: "/",
      templateUrl: 'views/getting-started.html',
      controller: 'GettingStartedCtrl'
    })
    .state('rulebook', {
      url: "/rulebook",
      templateUrl: 'views/rulebook.html',
      controller: 'RulebookCtrl'
    })
    .state('rulebook.intro', {
      url: "/intro",
      templateUrl: 'views/rulebook/introduction.html',
      controller: 'AboutCtrl'
    })
    .state('rulebook.mission', {
      url: "/mission",
      templateUrl: 'views/rulebook/mission.html',
      controller: 'AboutCtrl'
    })
    .state('rest-api-v1', {
      url: "/rest-api-v1",
      templateUrl: "views/rest-api-v1.html",
      controller: 'RestAPIv1Ctrl'
    })
    .state('rest-api-v1.get-missions', {
      url: "/get-missions",
      templateUrl: "views/get-missions.html",
      controller: 'GetMissionsController'
    })
    .state('rest-api-v1.get-mission', {
      url: "/get-mission",
      templateUrl: "views/get-mission.html",
      controller: 'GetMissionsController'
    })

  }]);
