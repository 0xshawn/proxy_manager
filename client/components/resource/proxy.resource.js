'use strict';

angular.module('proxyManagerApp')
  .factory('Proxy', function ($resource) {
    return $resource('/api/proxies/:id', {
      id: '@_id'
    }, {
      'start': {
        method: 'GET',
        url: '/api/proxies/:id/start'
      },
      'stop': {
        method: 'GET',
        url: '/api/proxies/:id/stop'
      }
    });
  });
