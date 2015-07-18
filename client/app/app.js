'use strict';

angular.module('proxyManagerApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ui.router',
    'ui.bootstrap',
    'angular-ladda'
  ])
  .config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  })
  .config(function(laddaProvider) {
    laddaProvider.setOption({
      style: 'expand-left'
    });
  });
