'use strict';

/**
 * @ngdoc function
 * @name avalancheDocsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the avalancheDocsApp
 */
angular.module('avalancheDocsApp')
  .controller('RulebookCtrl', ['$scope', '$location', function ($scope, $location) {
    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };
  }]);
