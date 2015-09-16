'use strict';

/**
 * @ngdoc function
 * @name avalancheDocsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the avalancheDocsApp
 */
angular.module('avalancheDocsApp')
  .controller('RestAPIv1Ctrl', ['$scope', '$location', '$cookies', '$window', '$rootScope', 'DataService', 'usSpinnerService', 'OAuthService', 'PageService',  function ($scope, $location, $cookies, $window, $rootScope, DataService, usSpinnerService, OAuthService, PageService) {

    $scope.pageData = PageService.get();
    $scope.pageList = PageService.all("rest-api-v1");
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
        return viewLocation === "rest-api-v1";
    };

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


    // Initialize
    $scope.response = {};
    $scope.hideResult = true;
    $scope.tokens = { availableOptions : [], selectedOption: []};
    $scope.tokens.availableOptions[0] = 'none';
    $scope.tokens.selectedToken = $scope.tokens.availableOptions[0];
    $scope.data = {}
    if(OAuthService.getToken() != "" && OAuthService.getToken() != undefined){
      $scope.tokens.availableOptions[1] = OAuthService.getToken();
      $scope.tokens.selectedToken = $scope.tokens.availableOptions[1];
    }
    DataService.getResponse()

    // API Calls
    $scope.getData = function(endpoint){
      var url = $scope.fullURL(endpoint);
      usSpinnerService.spin('spinner-1');
      DataService.get(url, $scope.processInputs(), $scope.tokens.selectedToken);
    }
    $scope.postData = function(endpoint){
      var url = $scope.fullURL(endpoint);
      usSpinnerService.spin('spinner-1');
      DataService.post(url, $scope.processInputs(), $scope.data, $scope.tokens.selectedToken);
    }

    $scope.processInputs = function(){
      var inputs = [];
      for (var i = 0; i < $scope.pageData.variables.length; i++) {
        if($scope.pageData.variables[i].name != $scope.pageData.endpoint.id1){
          var field = $scope.pageData.variables[i].name;
          inputs[field] = $scope.pageData.variables[i].value;
        }
      }
      return inputs;
    }


    $scope.hideResponse = function() {
      $scope.hideResult = true;
    }
    $rootScope.$on('get-data:finished', function() {
      if(!$scope.$$phase) {
        $scope.$apply(function(){
          $scope.response = DataService.getResponse();
          $scope.hideResult = false
        });
      } else {
          $scope.response = DataService.getResponse();
          $scope.hideResult = false
      }
      usSpinnerService.stop('spinner-1');
    });

    $rootScope.$on('auth:success', function() {
      if(!$scope.$$phase) {
        $scope.$apply(function(){
          $scope.token[1] = OAuthService.getToken();
          $scope.selectedToken = $scope.tokens.availableOptions[1];
        });
      } else {
          $scope.token[1] = OAuthService.getToken();
          $scope.selectedToken = $scope.tokens.availableOptions[1];
      }
    });

    // Misc Functions

    $scope.fullURL = function(endpoint){
      if(endpoint.object1 == undefined){
        return "http://localhost:5000/api" + endpoint.base;
      } else {
        var id1_value = ""
        for (var i = 0; i < $scope.pageData.variables.length; i++) {
          if($scope.pageData.variables[i].name == endpoint.id1){
            id1_value = $scope.pageData.variables[i].value
          }
        }
        if(id1_value == undefined || id1_value == ""){
          id1_value = ":" + endpoint.id1;
        }
        return "http://localhost:5000/api" + endpoint.object1 + id1_value + endpoint.object2;
      }

    }

    $scope.status = function(code) {
      if(code == 200){
        return {
          code : "200 OK",
          info: ""
        };
      }
      if(code == 201){
        return {
          code : "201 Created",
          info: "The request has been fulfilled and resulted in a new resource being created."
        };
      }
      if(code == 302){
        return {
          code : "302 Found",
          info: "The resource you are requesting has redirected you to another resource."
        };
      }
      if(code == 401){
        return {
          code : "401 Unauthorized",
          info: "The server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing)."
        };
      }
      if(code == 422){
        return {
          code : "422 Unprocessable Entity",
          info: "The request was well-formed but was unable to be followed due to semantic errors."
        };
      }
      if(code == 500){
        return {
          code : "500 Internal Server Error",
          info: "A generic error message, given when an unexpected condition was encountered and no more specific message is suitable."
        };
      }
    }

    $scope.stringfy = function(data) {
      return JSON.stringify(data, null, 4);
    }

    $scope.callTypeBadge = function(call) {
      if(call == "GET"){
        return "label label-success"
      } else if(call == "POST"){
        return "label label-info"
      } else if(call == "DELETE"){
        return "label label-danger"
      } else {
        return "label"
      }
    }

  }]);
