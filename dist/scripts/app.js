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
  ['$scope', '$interval', 'musicPlayer',
    function($scope, $interval, musicPlayer){

      $scope.setVolume = function(volume) {
        if ($scope.currentSong) {
          $scope.currentSong.buzzSoundFile.setVolume(volume);
        }
      };

      $scope.get_song_prop = function(prop) {
        var song_array = [];
        $scope.songs_list.forEach(function(element, index){
          song_array.push(element[prop]);
        });
        return song_array;
      };

      $scope.playAndTrack = function(index, ev) {

        if ($scope.currentSong === null) {
          $scope.currentSong = $scope.songs_list[index];
          $scope.currentSong.buzzSoundFile.togglePlay();
          $scope.activeSongIndex = index + 1;
        } else if ($scope.songs_list[index] === $scope.currentSong) {
          if (!$scope.currentSong.buzzSoundFile.isPaused()) {
            $scope.activeSongIndex = !index;
            $scope.currentSong.buzzSoundFile.pause();
          } else {
            $scope.activeSongIndex = index + 1;
            $scope.currentSong.buzzSoundFile.play();
          }
        } else if ($scope.songs_list[index] !== $scope.currentSong) {
          $scope.currentSong.buzzSoundFile.stop();
          $scope.currentSong = $scope.songs_list[index];
          $scope.currentSong.buzzSoundFile.togglePlay();
          $scope.activeSongIndex = index + 1;  
        }

        $scope.getTime();

        $scope.songStatus = $scope.userIsPlaying.isPlaying(ev);
      };

      $scope.tableElmtIsPlaying = function(index) {
        $scope.loopAlbum();
        return $scope.activeSongIndex === index;
      };

      $scope.getTime = function() {

        $scope.currentTime = "0:00";

        $interval(function() {
          $scope.currentTime = $scope.currentSong.buzzSoundFile.getTime();
          
          $scope.currentTime = Math.floor($scope.currentTime);
          var mins = Math.floor($scope.currentTime / 60);
          var secs = $scope.currentTime % 60;
          secs = secs.toString();
          if (secs.length < 2) {
            secs = '0' + secs;
          }
          var totalTime = mins + ':' + secs;
          $scope.currentTime = totalTime;
        }, 1000);
      };

      $scope.playerBarToggle = function() {
        for (var i = 0; i < $scope.songs_list.length; i++) {
          if ($scope.songs_list[i] === $scope.currentSong) {
            var num = i;
          }
        };
        
        if (!$scope.currentSong.buzzSoundFile.isPaused()) {
          $scope.activeSongIndex = !$scope.activeSongIndex;
        } if ($scope.currentSong.buzzSoundFile.isPaused()) {
          $scope.activeSongIndex = num + 1;
        }

        $scope.currentSong.buzzSoundFile.togglePlay();
        $scope.songStatus = !$scope.currentSong.buzzSoundFile.isPaused();
      };

      $scope.userIsPlaying = {
        userClickCount : 0,
        isPlaying: function(ev) {
          if (ev) {
            $scope.userIsPlaying.userClickCount++;
            return $scope.userIsPlaying.userClickCount % 2 === 1
          }
        }
      }

      $scope.loopAlbum = function() {
        if ($scope.songStatus && $scope.currentSong.buzzSoundFile.isEnded()) {
          $scope.next();
          $scope.currentSong.buzzSoundFile.play();
        }
      }

      $scope.next = function() {
        var nextSong; 

        for (var i = 0; i < $scope.songs_list.length; i++) {
          if ($scope.songs_list[i] === $scope.currentSong) {
            $scope.activeSongIndex = $scope.activeSongIndex + 1;
            nextSong = $scope.songs_list[i + 1];
            if($scope.currentSong === $scope.songs_list[4]) {
              nextSong = $scope.songs_list[0];
              $scope.activeSongIndex = 1;
              }
            }
          } 

        if (!$scope.currentSong.buzzSoundFile.isPaused()) {
          $scope.currentSong.buzzSoundFile.stop();
          nextSong.buzzSoundFile.play();
        }
        $scope.currentSong = nextSong;
      };

      $scope.previous = function() {
        var previousSong;

        for (var i = 0; i < $scope.songs_list.length; i++) {
          if ($scope.songs_list[i] === $scope.currentSong) {
            $scope.activeSongIndex = $scope.activeSongIndex - 1;
            previousSong = $scope.songs_list[i - 1];
            if($scope.currentSong === $scope.songs_list[0]) {
              $scope.activeSongIndex = 5;
              previousSong = $scope.songs_list[4];
            }
          } 
        };

        if (!$scope.currentSong.buzzSoundFile.isPaused()) {
          $scope.currentSong.buzzSoundFile.stop();
          previousSong.buzzSoundFile.play();
        }

        $scope.currentSong = previousSong;
      };

      $scope.setVolume($scope.currentVol);

      $scope.musicPlayer = musicPlayer
      $scope.album_info = $scope.musicPlayer.albumsObject.picasso      
      $scope.songs_list = $scope.album_info.songs;
      $scope.song_list_names = $scope.get_song_prop('name');
      $scope.song_list_length = $scope.get_song_prop('length');
      $scope.currentSong = $scope.musicPlayer.currentlyPlayingSong;
      $scope.songStatus;
      $scope.currentTime;
      $scope.currentVol = 80;  
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

blocJams.directive('playerBar', function() {
  return {
    restrict: 'AE',
    replace: true,
    templateUrl: '/templates/player-bar.html'
  }
})

blocJams.directive('seekBar', 
  ['$interval', function($interval) {
  return {
    restrict: 'AE',
    replace: true,
    templateUrl: '/templates/seek-bar.html',
    scope: {
      currentSongObject: "=",
      currentVol: "="
    },
    link: function(scope, element, attrs) {
           
          scope.setVolume = function(volume) {
            scope.currentVol = volume;
            scope.currentSongObject.buzzSoundFile.setVolume(volume);
            if (scope.currentSongObject) {
              scope.currentSongObject.buzzSoundFile.setVolume(volume);
            }
          };

          scope.seek = function(time) {
            if (scope.currentSongObject) {
              scope.currentSongObject.buzzSoundFile.setTime(time);
            }
          };

          updateSeekBarPercentage = function(ratio) {
            offsetXPercent = ratio * 100;
            offsetXPercent = Math.max(0, offsetXPercent);
            offsetXPercent = Math.min(offsetXPercent, 100);
            percentageString = offsetXPercent + '%';
            return percentageString;
          };

          var directiveSelector = element.parent().attr('class');
          var seekSelector = angular.element(document.querySelector('.seek-control')).attr('class');  
          var domSelector = angular.element(document.querySelector('.volume')).attr('class');  
          

          if(directiveSelector === seekSelector) {

            scope.$watch('currentSongObject', function(oldVal, newVal) {
              if (newVal !== oldVal) {
                $interval(function() {
                  var currentSongsDuration = scope.currentSongObject.buzzSoundFile.getDuration();
                  var currentSongsTime =  scope.currentSongObject.buzzSoundFile.getTime();
                  var currentSongsSeekBarFillRatio = currentSongsTime / currentSongsDuration;
                  var currentSongsPercentageString = updateSeekBarPercentage(currentSongsSeekBarFillRatio);

                  var fill = angular.element(element.children()[0]);
                  var thumb = angular.element(element.children()[1]);

                  fill.css({width: currentSongsPercentageString});
                  thumb.css({left: currentSongsPercentageString});
                }, 1000);
              }
            });


          }

          if(directiveSelector === domSelector) {

            var currentVolToString = scope.currentVol + '%';

            var fill = angular.element(element.children()[0]);
            var thumb = angular.element(element.children()[1])

            fill.css({width: currentVolToString});
            thumb.css({left: currentVolToString});
          }

          element.on('click', function(ev) {

            seekBarFillRatio = ev.offsetX / ev.target.clientWidth;

            if(directiveSelector === domSelector) {
                scope.currentSongObject;
                scope.setVolume(seekBarFillRatio * 100);
            } else {
                scope.currentSongObject;
                scope.seek(seekBarFillRatio * scope.currentSongObject.buzzSoundFile.getDuration())
            }

            offsetXPercent = seekBarFillRatio * 100;
            offsetXPercent = Math.max(0, offsetXPercent);
            offsetXPercent = Math.min(offsetXPercent, 100);
            percentageString = offsetXPercent + '%';

            var fill = angular.element(element.children()[0]);
            var thumb = angular.element(element.children()[1]);

            fill.css({width: percentageString});
            thumb.css({left: percentageString});
          });
        }
      }
}])

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












