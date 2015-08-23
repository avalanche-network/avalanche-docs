angular.module('avalancheDocsApp')
.service('GetData', [ '$rootScope', '$http',  function($rootScope, $http) {
  var response = {};
  this.fetch = function(url){
    console.log("Requesting data from " + url)
    $http({
      method: 'GET',
      url: 'http://localhost:5000/api' + url
    }).success(function(data, status, headers, config) {
      console.log("API Request SUCCESSFULL")

      response.data = data;
      response.status = status;
      response.headers = headers;
      response.config = config;
      console.log(response)
      $rootScope.$broadcast('get-data:finished');
    });
  }
  this.get = function() {
    return response;
  }

}])
