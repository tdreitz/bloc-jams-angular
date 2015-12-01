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
    .state('artist', {
      abstract: true,
      templateUrl: '/templates/album.html',
      controller: 'AlbumCtrl'
    })
    .state('artist.album', {
      url: '/album',
      templateUrl: '/templates/table.html',
    })
});

blocJams.factory('fetchAlbums', 
  ['$http', function($http) {
    $http.get("http://localhost:3000/scripts/fixtures.js")
      .then(function(response) {
        return albumPicasso;
      })
  }]);

blocJams.controller('LandingCtrl', ['$scope', function($scope) {
  $scope.tagline = 'Turn the music up!';
  $scope.points = {
    icons: ['music-note','radio-waves','iphone'],
    title: ['Choose your music', 'Stream it anywhere', 'Even on the go'],
    detail: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste cupiditate numquam delectus.'
  }
}]);

blocJams.controller('CollectionCtrl', 
  ['$scope', 'fetchAlbums', 
    function($scope, fetchAlbums) {
      $scope.album = albumPicasso
}]);

blocJams.controller('AlbumCtrl', 
  ['$scope', 'fetchAlbums', 
    function($scope, fetchAlbums){
      $scope.album = albumPicasso;
}]);