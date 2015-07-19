'use strict';

angular.module('proxyManagerApp')
  .controller('ProxyCtrl', function ($scope, $http, Modal, Proxy, Util, $interval, $timeout) {
    $scope.refresh = function () {
      $scope.refreshStatus = true;
      $scope.proxys = Proxy.query(function () {
        $timeout(function () {
          $scope.refreshStatus = false;
        }, 2000);
      });
    };

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

    $scope.showProxy = function (proxy) {
      Modal.show.proxy(proxy)();
    };

    $scope.refresh();

    $scope.startOrStopProxy = function (proxy) {
      proxy.loading = true; // start loading
      $timeout(function () {
        if (proxy.status === true) {
          stopProxy(proxy);
        } else {
          startProxy(proxy);
        }
        proxy.loading = false; // stop loading
      }, 2000);
    }

    $scope.proxyStatus = function (proxy) {
      if (proxy.status === true) {
        return "Running";
      } else {
        return "Click to Run"
      }
    };

    $scope.statusButtonClass = function (proxy) {
      if (proxy.status === true) {
        return "btn btn-success ladda-button btn-xs";
      } else {
        return "btn btn-danger  ladda-button btn-xs";
      }
    };

    var startProxy = function (proxy) {
      proxy.$start(function (proxy, success, error) {
        $scope.refresh();
      });
    };

    var stopProxy = function (proxy) {
      proxy.$stop(function (proxy, success, error) {
        $scope.refresh();
      });
    };
    $scope.docButtonClass = function (proxy) {
      if (proxy.status) {
        return "btn btn-info btn-xm";
      } else {
        return "btn btn-default btn-xm";
      }
    };
    $scope.docbuttonDisabled = function (proxy) {
      if (proxy.status) {
        return false;
      } else {
        return true;
      }
    };
  });
