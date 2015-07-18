'use strict';

angular.module('proxyManagerApp')
  .controller('ProxyCtrl', function($scope, $http, Modal, Proxy, Util, $interval, $timeout) {
    $scope.refresh = function() {
      $scope.proxys = Proxy.query();
    };
    // $scope.animationsEnabled = true;
    var saveProxy = function(proxy) {
      if (!('owner' in proxy)) {
        proxy['owner'] = Util.randomString(10);
      }
      var newProxy = new Proxy(proxy);
      newProxy.$save();
      $scope.refresh();
    };

    $scope.newProxy = function() {
      Modal.new.proxy(saveProxy)();
    };

    $scope.start_or_stop = function() {
      console.log('button click');
    };

    $scope.refresh();

    $scope.clickBtn = function() {
      $scope.loading = true; // start loading
      $timeout(function() {
        $scope.loading = false; // stop loading
      }, 2000);
    }
  });
