'use strict';

angular.module('proxyManagerApp')
  .controller('ProxyCtrl', function ($scope, $http, Modal, Proxy, Util, $interval, $timeout) {
    $scope.refresh = function () {
      $scope.refresh_status = true;
      $scope.proxys = Proxy.query(function () {
        $timeout(function () {
          $scope.refresh_status = false;
        }, 2000);
      });
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

    $scope.start_or_stop_proxy = function (proxy) {
      proxy.loading = true; // start loading
      $timeout(function () {
        if (proxy.status === true) {
          stop_proxy(proxy);
        } else {
          start_proxy(proxy);
        }
        proxy.loading = false; // stop loading
      }, 2000);
    }

    $scope.proxy_status = function (proxy) {
      if (proxy.status === true) {
        return "Running";
      } else {
        return "Not Running"
      }
    };

    $scope.status_button_class = function (proxy) {
      if (proxy.status === true) {
        return "btn btn-success ladda-button";
      } else {
        return "btn btn-danger  ladda-button";
      }
    };

    var start_proxy = function (proxy) {
      proxy.$start(function (proxy, success, error) {
        $scope.refresh();
      });
    };

    var stop_proxy = function (proxy) {
      console.log(proxy);
      proxy.$stop(function (proxy, success, error) {
        $scope.refresh();
      });
    };
  });
