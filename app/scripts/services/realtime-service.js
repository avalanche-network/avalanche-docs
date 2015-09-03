angular.module('avalancheDocsApp')
.factory('RealtimeService', [ '$rootScope', '$http',  function($rootScope, $http) {
  var FayeServerURL = 'https://avalanche-realtime.herokuapp.com/faye'

  var client = new Faye.Client(FayeServerURL);

  client.on('transport:down', function() {
    console.log("offline");
    $rootScope.$broadcast('realtime:offline');
  });

  client.on('transport:up', function() {
    console.log("online");
    $rootScope.$broadcast('realtime:online');
  });

  return {
    publish: function(channel, message) {
      client.publish(channel, message);
    },

    subscribe: function(channel, callback) {
      client.subscribe(channel, callback).then(function() {
        console.log("subscribing to " + channel)
      });
    },
    disconect: function() {
      console.log("Disconecting...")
      client.disconnect();
      $rootScope.$broadcast('realtime:offline');
    },
    connect: function() {
      client = new Faye.Client(FayeServerURL);
      $rootScope.$broadcast('realtime:online');
    }
  }
}]);
