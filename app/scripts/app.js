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

blocJams.controller('LandingCtrl', ['$scope', function($scope) {
  $scope.tagline = 'Turn the music up!';
  $scope.points = {
    icons: ['music-note','radio-waves','iphone'],
    title: ['Choose your music', 'Stream it anywhere', 'Even on the go'],
    detail: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste cupiditate numquam delectus.'
  }
}]);

blocJams.controller('CollectionCtrl', 
  ['$scope', 
    function($scope) {
      $scope.album = albumPicasso
}]);

blocJams.controller('AlbumCtrl', 
  ['$scope', 'musicPlayer',
    function($scope, musicPlayer){
      // $scope.album = albumPicasso;

      $scope.currentSoundFile = musicPlayer;

      console.log($scope);
}]);

blocJams.directive('bjPoints', function() {
  return {
    templateUrl: '/directive/selling-points.html'
  }
});

blocJams.service('musicPlayer', function() {
  var mySound1 = new buzz.sound("/../assets/music/blue.mp3"),
      mySound2 = new buzz.sound("/../assets/music/green.mp3"),
      mySound3 = new buzz.sound("/../assets/music/red.mp3"),
      mySound4 = new buzz.sound("/../assets/music/pink.mp3"),
      mySound5 = new buzz.sound("/../assets/music/magenta.mp3");

  var currentAlbum = [mySound1, mySound2, mySound3, mySound4, mySound5];

  console.log(currentAlbum);

  return currentAlbum
});













