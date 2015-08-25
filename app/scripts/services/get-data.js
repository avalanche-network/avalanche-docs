angular.module('avalancheDocsApp')
.service('GetData', [ '$rootScope', '$http',  function($rootScope, $http) {
  var response = {};
  this.fetch = function(url, token){
    console.log("Requesting data from " + url)
    $http({
      method: 'GET',
      url: 'http://localhost:5000/api' + url,
      headers: { 'Authorization' : "Bearer " + token }
    }).then(function(data, status, headers, config) {
      console.log("API Request SUCCESSFULL")
      response.data = data.data;
      response.status = data.status;
      response.headers = data.headers;
      response.config = data.config;
      console.log(response)
      $rootScope.$broadcast('get-data:finished');
    },
    function(data, status) {
      console.log("API Request FAILED")
      response.data = data.data;
      response.status = data.status;
      response.headers = data.headers;
      response.config = data.config;
      console.log(response)
      $rootScope.$broadcast('get-data:finished');
    });
  }
  this.get = function() {
    return response;
  }

}])
