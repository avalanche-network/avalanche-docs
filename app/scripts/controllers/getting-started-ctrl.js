'use strict';

/**
 * @ngdoc function
 * @name avalancheDocsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the avalancheDocsApp
 */
angular.module('avalancheDocsApp')
  .controller('GettingStartedCtrl', ['$scope', '$cookies', '$sanitize', 'OAuthService', '$location', function ($scope, $cookies, $sanitize, OAuthService, $location) {

    OAuthService.lookForAuthCode();

    var before_login_page = $cookies.get('avalanche_docs_before_login_page');
    if(before_login_page != undefined) {
      console.log("redirecting to: " + $sanitize(before_login_page));
      $cookies.remove('avalanche_docs_before_login_page')
      $location.path($sanitize(before_login_page)).replace();
    }

    $scope.navActivePage = function (viewLocation) {
        return viewLocation === "getting-started";
    };



  }]);
