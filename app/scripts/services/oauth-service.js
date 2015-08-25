angular.module('avalancheDocsApp')
.service('OAuthService', [ '$rootScope', '$http', '$location', '$routeParams', '$cookies',  function($rootScope, $http, $location, $routeParams, $cookies) {
  var code = {};
  var token = $cookies.get('avalanche_docs_token');;
  this.lookForAuthCode = function(){
    code = $location.search().code;
    if(code != undefined) {
      console.log(code);
      // Reset URL
      $location.search("code", null);
      $routeParams= null;
      this.authorize(code);
    }
  }

  this.authorize = function(code){
    $http({
      method: 'POST',
      url: 'http://localhost:5000/oauth/token?client_id=d514f58c234d69ce1405f00dbef842bd785c09201b35a746d87306f5e69fd02b&client_secret=de63eb190485179d713df3e15339eb618e78e94ab96185621112dd0e5215997c&grant_type=authorization_code&redirect_uri=http://localhost:9000/&code=' + code
    }).then(function(data) {
      token = data.data.access_token;
      console.log("Token Authentication SUCCESSFULL")
      console.log(token);
      $cookies.put('avalanche_docs_token', token);
      $rootScope.$broadcast('auth:success');
    },
    function(data) {
      console.log("Token Authentication FAILED")
      console.log(data);
      $rootScope.$broadcast('auth:failed');
    });
  }

  this.getToken = function() {
    return token;
  }

}])
