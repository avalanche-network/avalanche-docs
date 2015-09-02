angular.module('avalancheDocsApp')
.service('PageService', [ '$rootScope', '$http',  function($rootScope, $http) {
  var pages = [];
  var current_page = {};

  this.find = function(page){
    if( pages.length > 0) {
      searchForPage(page);
    } else {
      $http({
        method: 'GET',
        url: 'data/rest-api-v1-pages.json'
      }).then(function(data) {
        pages = data.data;
        searchForPage(page);
        $rootScope.$broadcast('get-pages:finished');
      });
    }
  }

  this.get = function(){
    return current_page;
  }

  this.all = function(){
    return pages;
  }

  searchForPage = function(page) {
    //console.log("searching for " + page);
    for (var i = 0; i < pages.length; i++) {
      //console.log(pages[i].slug);
      if (pages[i].slug == page) {
        current_page = pages[i];
        return current_page;
      }
    }
  }

}])
