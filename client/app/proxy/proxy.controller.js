'use strict';

angular.module('proxyManagerApp')
  .controller('ProxyCtrl', function ($scope, $http, Modal, Proxy, Util) {
    $scope.refresh = function () {
      $scope.proxys = Proxy.query();
    };
    // $scope.animationsEnabled = true;
    var newProxy = function (proxy) {
      if (!('owner' in proxy)) {
        proxy['owner'] = Util.randomString(10);
      }
      var newProxy = new Proxy(proxy);
      newProxy.$save();
      $scope.refresh();
    };
    $scope.newProxy = function () {
      Modal.new.proxy(newProxy)();
    };

    $scope.refresh();
  });
