'use strict';

angular.module('proxyManagerApp')
  .controller('ProxyCtrl', function ($scope, $http, Modal, Proxy, Util, $interval, $timeout) {
    $scope.refresh = function () {
      $scope.proxys = Proxy.query();
    };
    // $scope.animationsEnabled = true;
    var saveProxy = function (proxy) {
      if (!('owner' in proxy)) {
        proxy['owner'] = Util.randomString(10);
      }
      var newProxy = new Proxy(proxy);
      newProxy.$save();
      $scope.refresh();
    };

    $scope.newProxy = function () {
      Modal.new.proxy(saveProxy)();
    };

    $scope.start_or_stop = function () {
      console.log('button click');
    };

    $scope.refresh();



    $scope.showLoading = function () {
      // Set ladda loading true
      // Loading spinner will be shown;
      $scope.laddaLoading = true;
      $timeout(function () {
        // Set ladda loading false after 3 Seconds.
        // Loading spinner will be hidden;
        $scope.laddaLoading = false;
      }, 3000);
    };

    // Example without progress Bar
    $scope.loadingWithProgress = function () {
      // Set progress 0;
      $scope.laddaLoadingBar = 0;
      // Run in every 30 milliseconds
      var interval = $interval(function () {
        // Increment by 1;
        $scope.laddaLoadingBar++;
        if ($scope.laddaLoadingBar >= 100) {
          // Cancel interval if progress is 100
          $interval.cancel(interval);
          //Set ladda loading false
          $scope.laddaLoadingBar = false;
        }
      }, 30);
    };
  });
