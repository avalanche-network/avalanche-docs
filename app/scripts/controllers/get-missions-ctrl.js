'use strict';

/**
 * @ngdoc function
 * @name avalancheDocsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the avalancheDocsApp
 */
angular.module('avalancheDocsApp')
  .controller('GetMissionsController',['$scope', '$rootScope', 'GetData', 'usSpinnerService', 'OAuthService', function ($scope, $rootScope, GetData, usSpinnerService, OAuthService) {

    $scope.response = {};
    $scope.hideResult = true;
    $scope.token = [];
    $scope.token[0] = 'none';
    $scope.selectedToken = $scope.token[0];
    if(OAuthService.getToken() != ""){
      $scope.token[1] = OAuthService.getToken();
      $scope.selectedToken = $scope.token[1];
    }

    GetData.get()

    $scope.call_api = function(url){
      usSpinnerService.spin('spinner-1');
      GetData.fetch(url, $scope.selectedToken);
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

    $rootScope.$on('auth:success', function() {
      if(!$scope.$$phase) {
        $scope.$apply(function(){
          $scope.token[1] = OAuthService.getToken();
          $scope.selectedToken = $scope.token[1];
        });
      } else {
          $scope.token[1] = OAuthService.getToken();
          $scope.selectedToken = $scope.token[1];
      }
    });

    $scope.status = function(code) {
      if(code == 200){ return "200 OK"}
      if(code == 401){ return "401 Unauthorized"}
    }
    $scope.stringfy = function(data) {
      return JSON.stringify(data, null, 4);
    }

  }])
