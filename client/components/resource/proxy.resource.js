'use strict';

angular.module('proxyManagerApp')
  .factory('Proxy', function ($resource) {
    return $resource('/api/proxies/:id', {
      id: '@_id'
    });
  });
