var blocJams = angular.module('blocJams', ['ui.router']);

blocJams.config(function($stateProvider, $locationProvider) {
  
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });

  $stateProvider
    .state('landing', {
      url: '/',
      // controller: 'landing.controller',
      templateUrl:  '/templates/landing.html'
    })
    .state('collection', {
      url: '/collection',
      // controller: 'collection.controller',
      templateUrl: '/templates/collection.html'
    })
    .state('album', {
      url: '/album',
      // controller: 'album.controller',
      templateUrl: '/templates/album.html'
    })
});