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
      url:'/album',
      templateUrl: '/templates/album.html',
      controller: 'AlbumCtrl'
    })
});

blocJams.controller('LandingCtrl', 
  ['$scope', function($scope) {
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

      $scope.get_song_prop = function(prop) {
        var song_array = [];
        $scope.songs_list.forEach(function(element, index){
          song_array.push(element[prop]);
        });
        return song_array;
      };

      $scope.playAndTrack = function(index) {

        if ($scope.currentSong === null) {
          $scope.currentSong = $scope.songs_list[index];
          $scope.currentSong.buzzSoundFile.togglePlay();
          $scope.activeSongIndex = index;
        } else if ($scope.songs_list[index] === $scope.currentSong) {
          $scope.currentSong = $scope.songs_list[index];
          $scope.currentSong.buzzSoundFile.togglePlay();
          $scope.activeSongIndex = !index;
        } else if ($scope.songs_list[index] !== $scope.currentSong) {
          $scope.currentSong.buzzSoundFile.pause();
          $scope.currentSong = $scope.songs_list[index];
          $scope.currentSong.buzzSoundFile.togglePlay();
          $scope.activeSongIndex = index;  
        }
      };
         
      $scope.isPlaying = function(index) { 
        return $scope.activeSongIndex === index;
       } 

      $scope.playerBarToggle = function() {
        $scope.currentSong.buzzSoundFile.togglePlay();
      };

      $scope.next = function() {
        var nextSong;

        for (var i = 0; i < $scope.songs_list.length; i++) {
          if ($scope.songs_list[i] === $scope.currentSong) {
            nextSong = $scope.songs_list[i + 1];
            if($scope.currentSong === $scope.songs_list[4]) {
              nextSong = $scope.songs_list[0];
            }
          } 
        };

        if (!$scope.currentSong.buzzSoundFile.isPaused()) {
          $scope.currentSong.buzzSoundFile.stop();
          nextSong.buzzSoundFile.play();
        }

        $scope.currentSong = nextSong;

        $log.log($scope.currentSong);
      }

      $scope.previous = function() {
        var previousSong;

        for (var i = 0; i < $scope.songs_list.length; i++) {
          if ($scope.songs_list[i] === $scope.currentSong) {
            previousSong = $scope.songs_list[i - 1];
            if($scope.currentSong === $scope.songs_list[0]) {
              previousSong = $scope.songs_list[4];
            }
          } 
        };

        if (!$scope.currentSong.buzzSoundFile.isPaused()) {
          $scope.currentSong.buzzSoundFile.stop();
          previousSong.buzzSoundFile.play();
        }

        $scope.currentSong = previousSong;
      }

      $scope.musicPlayer = musicPlayer
      $scope.album_info = $scope.musicPlayer.albumsObject.picasso      
      $scope.songs_list = $scope.album_info.songs;
      $scope.song_list_names = $scope.get_song_prop('name');
      $scope.song_list_length = $scope.get_song_prop('length');
      $scope.currentSong = $scope.musicPlayer.currentlyPlayingSong;

      $log.log($scope.currentSong);     
}]);

blocJams.directive('bjPoints', function() {
  return {
    templateUrl: '/directive/selling-points.html'
  }
});

blocJams.directive('mainControls', function() {
  return {
    restrict: 'AE',
    templateUrl: '/templates/main-controls.html',
    replace: true
  }
});

blocJams.directive('songsListTable', function() {
  return {
    restrict: 'AE',
    replace: true,
    templateUrl: '/templates/table.html',
  }
})

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













