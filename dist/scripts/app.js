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
  ['$scope', '$log', 'musicPlayer',
    function($scope, $log, musicPlayer){

      $scope.musicPlayer = musicPlayer
      // $log.log($scope.musicPlayer.albumsObject)
      // $log.log($scope.musicPlayer.albumsObject.picasso)

      $scope.playAndTrack = function() {
        $scope.musicPlayer.albumsObject.picasso.songs[0].buzzSoundFile.togglePlay();

        $scope.musicPlayer[1] = !$scope.musicPlayer.albumsObject.picasso.songs[0].buzzSoundFile.isPaused();

        //$log.log($scope.musicPlayer);
      }     

      $scope.get_song_prop = function(prop) {
        var song_array = [];
        $scope.songs_list.forEach(function(element, index){
          song_array.push(element[prop]);
        });
        return song_array;
      }

      $scope.album_info = $scope.musicPlayer.albumsObject.picasso
      $scope.songs_list = $scope.album_info.songs;
      $scope.song_list_names = $scope.get_song_prop('name');
      $scope.song_list_length = $scope.get_song_prop('length');
      
      // $log.log($scope.song_list_names);

}]);

blocJams.directive('bjPoints', function() {
  return {
    templateUrl: '/directive/selling-points.html'
  }
});

blocJams.service('musicPlayer', function() {

  var albums = {
    picasso: albumPicasso, 
    marconi: albumMarconi
  }

  var addBuzzSoundFile = function(element, index, array) {
    array[index].buzzSoundFile = new buzz.sound(albums.picasso.songs[index].audioUrl);
  }

  albums.picasso.songs.forEach(addBuzzSoundFile);

  var currentlyPlayingSong =  null;

  var persistentData = {
    albumsObject: albums,
    currentlyPlayingSong: null
  };

  return persistentData;
});













