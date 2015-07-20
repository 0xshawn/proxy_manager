'use strict';

angular.module('proxyManagerApp')
  .factory('Proxy', function ($resource) {
    return $resource('/api/proxies/:id/:action', {
      id: '@_id'
    }, {
      'me': {
        method: 'GET',
        params: {
          id: 'me'
        },
        isArray: true
      },
      'start': {
        method: 'GET',
        params: {
          action: 'start'
        }
      },
      'stop': {
        method: 'GET',
        params: {
          action: 'stop'
        }
      }
    });
  });
