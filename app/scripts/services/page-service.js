angular.module('avalancheDocsApp')
.service('PageService', [ '$rootScope', '$http',  function($rootScope, $http) {
  var pages = [];
  var current_page = {};

  this.find = function(group, page){
    if( pages.length > 0) {
      searchForPage(group, page);
    } else {
      $http({
        method: 'GET',
        url: 'data/page-list.json'
      }).then(function(data) {
        pages = data.data;
        searchForPage(group, page);
        $rootScope.$broadcast('get-pages:finished');
      });
    }
  }

  this.get = function(){
    return current_page;
  }

  this.all = function(group){
    return pages[group];
  }

  searchForPage = function(group, page) {
    //console.log("searching for " + page);
    for (var i = 0; i < pages[group].length; i++) {
      //console.log(pages[group][i].slug);
      if (pages[group][i].slug == page) {
        current_page = pages[group][i];
        return current_page;
      }
    }
  }

}])
