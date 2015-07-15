'use strict';

angular.module('proxyManagerApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('proxy', {
        url: '/proxy',
        templateUrl: 'app/proxy/proxy.html',
        controller: 'ProxyCtrl'
      });
  });