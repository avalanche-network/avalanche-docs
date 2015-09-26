angular.module('avalancheDocsApp')
.service('DataService', [ '$rootScope', '$http',  function($rootScope, $http) {
  var response = {};

  // GET
  this.get = function(url, inputs, token){
    console.log("Requesting data from " + url);
    console.log(inputs);
    console.log(token);
    $http({
      method: 'GET',
      url: url,
      headers: { 'Authorization' : "Bearer " + token },
      params: inputs
    }).then(function(data, status, headers, config) {
      console.log("GET Request SUCCESSFULL")
      response.data = data.data;
      response.status = data.status;
      response.headers = data.headers;
      response.config = data.config;
      console.log(response)
      $rootScope.$broadcast('get-data:finished');
    },
    function(data, status) {
      console.log("GET Request FAILED")
      response.data = data.data;
      response.status = data.status;
      response.headers = data.headers;
      response.config = data.config;
      console.log(response)
      $rootScope.$broadcast('get-data:finished');
    });
  }

  // POST
  this.post = function(url, inputs, token){
    console.log("Posting data to " + url);
    console.log(inputs);
    console.log(token);
    $http({
      method: 'POST',
      url: url,
      headers: { 'Authorization' : "Bearer " + token },
      params: inputs
    }).then(function(data, status, headers, config) {
      console.log("POST Request SUCCESSFULL")
      response.data = data.data;
      response.status = data.status;
      response.headers = data.headers;
      response.config = data.config;
      console.log(response)
      $rootScope.$broadcast('get-data:finished');
    },
    function(data, status) {
      console.log("POST Request FAILED")
      response.data = data.data;
      response.status = data.status;
      response.headers = data.headers;
      response.config = data.config;
      console.log(response)
      $rootScope.$broadcast('get-data:finished');
    });
  }

  // RESPONSE
  this.getResponse = function() {
    return response;
  }

}])
