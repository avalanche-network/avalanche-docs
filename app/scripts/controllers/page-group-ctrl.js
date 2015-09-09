'use strict';

/**
 * @ngdoc function
 * @name avalancheDocsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the avalancheDocsApp
 */
angular.module('avalancheDocsApp')
  .controller('PageGroupCtrl', ['$scope', '$location', '$cookies', '$window', '$rootScope', 'DataService', 'usSpinnerService', 'OAuthService', 'PageService',  function ($scope, $location, $cookies, $window, $rootScope, DataService, usSpinnerService, OAuthService, PageService) {

    $scope.pageData = PageService.get();
    $scope.pageList = PageService.all(PageService.getGroup());
    //console.log("Loading page " + $scope.pageData.title)

    $rootScope.$on('get-pages:finished', function() {
      if(!$scope.$$phase) {
        $scope.$apply(function(){
          $scope.pageData = PageService.get();
        });
      } else {
          $scope.pageData = PageService.get();
      }
    });

    $scope.navActivePage = function (viewLocation) {
        return viewLocation === PageService.getGroup();
    };

    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };

  }]);
