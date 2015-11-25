var blocJams = angular.module('blocJams', ['ui.router']);

blocJams.config(function($stateProvider, $locationProvider) {
  
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });

  $stateProvider
    .state('landing', {
      url: '/',
      controller: 'LandingCtrl',
      templateUrl:  '/templates/landing.html'
    })
    .state('collection', {
      url: '/collection',
      controller: 'CollectionCtrl',
      templateUrl: '/templates/collection.html'
    })
    .state('album', {
      url: '/album',
      controller: 'AlbumCtrl',
      templateUrl: '/templates/album.html'
    });
});

blocJams.controller('LandingCtrl', ['$scope', function($scope) {
  $scope.tagline = 'Turn the music up!';
}]);

blocJams.controller('CollectionCtrl', ['$scope', '$http', function($scope, $http) {
  $http.get("http://localhost:3000/scripts/fixtures.js")
    .success(function(data) {});
  $scope.album = albumPicasso;
}]);

blocJams.controller('AlbumCtrl', ['$scope', '$http', function($scope, $http){
  $http.get("http://localhost:3000/scripts/fixtures.js")
    .success(function(data) {});
  $scope.album = albumPicasso;
  $scope.albumSongs = albumPicasso.songs;
}]);