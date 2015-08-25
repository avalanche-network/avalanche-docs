'use strict';

/**
 * @ngdoc function
 * @name avalancheDocsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the avalancheDocsApp
 */
angular.module('avalancheDocsApp')
  .controller('RestAPIv1Ctrl', ['$scope', '$location', '$cookies', '$window',  function ($scope, $location, $cookies, $window) {

    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };

    $scope.token = $cookies.get('avalanche-docs-token');
    if($scope.token == undefined) {
      $scope.token = "none";
      $scope.hideToken = true;
    }

    $scope.authorizeUser = function(){
      console.log($location.url());
      $cookies.put('avalanche_docs_before_login_page', $location.url());
      $window.location.href = 'http://localhost:5000/oauth/authorize?client_id=d514f58c234d69ce1405f00dbef842bd785c09201b35a746d87306f5e69fd02b&redirect_uri=http://localhost:9000/&response_type=code';
    }

  }]);
