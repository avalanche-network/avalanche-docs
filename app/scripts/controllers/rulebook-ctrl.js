'use strict';

/**
 * @ngdoc function
 * @name avalancheDocsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the avalancheDocsApp
 */
angular.module('avalancheDocsApp')
  .controller('RulebookCtrl', ['$scope', '$location', 'PageService', '$rootScope', function ($scope, $location, PageService, $rootScope) {

    $scope.pageData = PageService.get();
    $scope.pageList = PageService.all("rulebook");
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
        return viewLocation === "rulebook";
    };

    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };
  }]);
