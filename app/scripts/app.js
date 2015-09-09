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
    'ngJsonExplorer',
    'angularSpinner',
    'btford.markdown'
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
      url: "/rulebook/:id",
      templateUrl: 'views/rulebook.html',
      controller: 'RulebookCtrl',
      resolve: {
        pageData: function($stateParams, PageService) {
          return PageService.find("rulebook", $stateParams.id);
        },
      }
    })
    .state('rest-api-v1', {
      url: "/rest-api-v1/:id",
      templateUrl: "views/rest-api-v1.html",
      controller: 'RestAPIv1Ctrl',
      resolve: {
        pageData: function($stateParams, PageService) {
          return PageService.find("rest-api-v1", $stateParams.id);
        },
      }
    })
    .state('realtime-api-v1', {
      url: "/realtime-api-v1/:id",
      templateUrl: "views/realtime-api-v1.html",
      controller: 'RealtimeAPIv1Ctrl',
      resolve: {
        pageData: function($stateParams, PageService) {
          return PageService.find("realtime-api-v1", $stateParams.id);
        },
      }
    })
    .state('theme', {
      url: "/theme/:id",
      templateUrl: "views/page.html",
      controller: 'PageGroupCtrl',
      resolve: {
        pageData: function($stateParams, PageService) {
          return PageService.find("theme", $stateParams.id);
        },
      }
    })
  }])
