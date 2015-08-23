'use strict';

/**
 * @ngdoc function
 * @name avalancheDocsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the avalancheDocsApp
 */
angular.module('avalancheDocsApp')
  .controller('GetMissionsController',['$scope', '$rootScope', 'GetData', 'usSpinnerService', function ($scope, $rootScope, GetData, usSpinnerService) {

    $scope.response = {};
    $scope.hideResult = true;
    GetData.get()

    $scope.call_api = function(url){
      usSpinnerService.spin('spinner-1');
      GetData.fetch(url);
    }
    $scope.hideResponse = function() {
      $scope.hideResult = true;
    }
    $rootScope.$on('get-data:finished', function() {
      if(!$scope.$$phase) {
        $scope.$apply(function(){
          $scope.response = GetData.get();
          $scope.hideResult = false
        });
      } else {
          $scope.response = GetData.get();
          $scope.hideResult = false
      }
      usSpinnerService.stop('spinner-1');
    });

    $scope.status = function(code) {
      if(code == 200){ return "200 OK"}
    }
    $scope.stringfy = function(data) {
      return JSON.stringify(data, null, 4);
    }

  }])
