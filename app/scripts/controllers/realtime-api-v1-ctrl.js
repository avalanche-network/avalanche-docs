'use strict';

/**
 * @ngdoc function
 * @name avalancheDocsApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the avalancheDocsApp
 */
angular.module('avalancheDocsApp')
  .controller('RealtimeAPIv1Ctrl', ['$scope', '$location', '$cookies', '$window', '$rootScope', 'DataService', 'usSpinnerService', 'OAuthService', 'PageService', 'RealtimeService',  function ($scope, $location, $cookies, $window, $rootScope, DataService, usSpinnerService, OAuthService, PageService, RealtimeService) {

    $scope.pageData = PageService.get();
    $scope.pageList = PageService.all("realtime-api-v1");
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
        return viewLocation === "realtime-api-v1";
    };

    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };



    $scope.authorizeApplication = function(){
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
      if(!$scope.$$phase) {
        $scope.$apply(function(){
          $scope.tokens.availableOptions[1] = OAuthService.getToken();
          $scope.tokens.selectedToken = $scope.tokens.availableOptions[1];
        });
      } else {
        $scope.tokens.availableOptions[1] = OAuthService.getToken();
        $scope.tokens.selectedToken = $scope.tokens.availableOptions[1];
      }
    }
    DataService.getResponse()

    // API Calls
    $scope.getData = function(url){
      usSpinnerService.spin('spinner-1');
      DataService.get(url, $scope.processInputs(), $scope.tokens.selectedToken);
    }
    $scope.postData = function(url){
      usSpinnerService.spin('spinner-1');
      DataService.post(url, $scope.processInputs(), $scope.data, $scope.tokens.selectedToken);
    }

    $scope.processInputs = function(){
      var inputs = [];
      for (var i = 0; i < $scope.pageData.variables.length; i++) {
        var field = $scope.pageData.variables[i].name;
        inputs[field] = $scope.pageData.variables[i].value;
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

    $scope.subscribing = false;
    $scope.messages = [];
    $scope.messages.add = function(message) {
      this.push(message);
    }

    // Listen to data coming from the server via Faye
    $scope.subscribe = function(url){
      if($scope.has_disconected == true){
        RealtimeService.connect();
      }
      RealtimeService.subscribe(url, function(msg) {
        $scope.$apply(function() {
          $scope.messages.add(msg);
          console.log(msg);
        });
      });
    }


    // Post the data to the server and have it send to us
    $scope.sendServer = function() {
      $http.post('/', { foo: 'asd', message: $scope.message })
        .success(function() {
          $scope.message = '';
        })
        .error(function(data, status) {
          $scope.messages.add('error', "Error doing POST to server: " + status);
        });
    };

    // Send data to server via Faye
    $scope.sendClient = function() {
      Faye.publish('/fromclient', $scope.message);
      $scope.messages.add('outgoing', $scope.message);
      $scope.message = '';
    };

    // Misc
    $rootScope.$on('realtime:offline', function() {
      if(!$scope.$$phase) {
        $scope.$apply(function(){
          $scope.connection_status = "<div class=\"circle-error\"></div> Disconected";
          $scope.has_connection = false;
        })
      } else {
        $scope.connection_status = "<div class=\"circle-error\"></div> Disconected";
        $scope.has_connection = false;
      }
    });
    $rootScope.$on('realtime:online', function() {
      if(!$scope.$$phase) {
        $scope.$apply(function(){
          $scope.connection_status = "<div class=\"circle-ok\"></div> Connected";
          $scope.has_connection = true;
          $scope.subscribing = true;
        })
      } else {
        $scope.connection_status = "<div class=\"circle-ok\"></div> Connected";
        $scope.has_connection = true;
        $scope.subscribing = true;
      }
    });
    $scope.disconect = function() {
      RealtimeService.disconect();
      $scope.has_disconected = true;
    }


  }]);
