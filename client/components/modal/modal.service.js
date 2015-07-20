'use strict';

angular.module('proxyManagerApp')
  .factory('Modal', function ($rootScope, $modal) {
    /**
     * Opens a modal
     * @param  {Object} scope      - an object to be merged with modal's scope
     * @param  {String} modalClass - (optional) class(es) to be applied to the modal
     * @return {Object}            - the instance $modal.open() returns
     */
    function openModal(scope, modalClass, templateUrl) {
      var modalScope = $rootScope.$new();
      scope = scope || {};
      modalClass = modalClass || 'modal-default';
      templateUrl = templateUrl || 'components/modal/modal.html';

      angular.extend(modalScope, scope);

      return $modal.open({
        templateUrl: templateUrl,
        windowClass: modalClass,
        scope: modalScope
      });
    }

    // Public API here
    return {

      /* Confirmation modals */
      confirm: {

        /**
         * Create a function to open a delete confirmation modal (ex. ng-click='myModalFn(name, arg1, arg2...)')
         * @param  {Function} del - callback, ran when delete is confirmed
         * @return {Function}     - the function to open the modal (ex. myModalFn)
         */
        delete: function (del) {
          del = del || angular.noop;

          /**
           * Open a delete confirmation modal
           * @param  {String} name   - name or info to show on modal
           * @param  {All}           - any additional args are passed staight to del callback
           */
          return function () {
            var args = Array.prototype.slice.call(arguments),
              name = args.shift(),
              deleteModal;

            deleteModal = openModal({
              modal: {
                dismissable: true,
                title: 'Confirm Delete',
                html: '<p>Are you sure you want to delete <strong>' + name + '</strong> ?</p>',
                buttons: [{
                  classes: 'btn-danger',
                  text: 'Delete',
                  click: function (e) {
                    deleteModal.close(e);
                  }
                }, {
                  classes: 'btn-default',
                  text: 'Cancel',
                  click: function (e) {
                    deleteModal.dismiss(e);
                  }
                }]
              }
            }, 'modal-danger');

            deleteModal.result.then(function (event) {
              console.log(event);
              console.log(args);
              del.apply(event, args);
            });
          };
        },
        warning: function (message) {
          /**
           * Open a delete confirmation modal
           * @param  {String} name   - name or info to show on modal
           * @param  {All}           - any additional args are passed staight to del callback
           */
          return function () {
            var args = Array.prototype.slice.call(arguments),
              name = args.shift(),
              warningModal;

            warningModal = openModal({
              modal: {
                dismissable: true,
                title: 'Warning',
                html: '<p>' + message + '</p>',
                buttons: [{
                  classes: 'btn-warning',
                  text: 'Back',
                  click: function (e) {
                    warningModal.close(e);
                  }
                }, {
                  classes: 'btn-default',
                  text: 'Cancel',
                  click: function (e) {
                    warningModal.dismiss(e);
                  }
                }]
              }
            }, 'modal-warning');

            warningModal.result.then(function (event) {});
          };
        }
      },
      new: {
        proxy: function (callback, data) {
          return function () {
            var args = Array.prototype.slice.call(arguments),
              name = args.shift(),
              data = data || {},
              newModal;

            newModal = openModal({
              modal: {
                dismissable: true,
                title: 'New Proxy',
                // html: '<p>Are you sure you want to delete <strong>' + name + '</strong> ?</p>',
                buttons: [{
                  classes: 'btn-primary',
                  text: 'Create',
                  click: function (e) {
                    newModal.close(e);
                  }
                }, {
                  classes: 'btn-default',
                  text: 'Cancel',
                  click: function (e) {
                    newModal.dismiss(e);
                  }
                }]
              },
              data
            }, 'modal-primary', 'app/proxy/proxy.new.html');

            newModal.result.then(function (data) {
              callback(data);
            });
          };
        }
      },
      show: {
        proxy: function (proxy) {
          return function () {
            var args = Array.prototype.slice.call(arguments),
              name = args.shift(),
              data = proxy,
              newModal;
            newModal = openModal({
              modal: {
                dismissable: true,
                title: 'Configure Your Client',
                buttons: [{
                  classes: 'btn-primary',
                  text: 'Confirm',
                  click: function (e) {
                    newModal.close(e);
                  }
                }, {
                  classes: 'btn-default',
                  text: 'Cancel',
                  click: function (e) {
                    newModal.dismiss(e);
                  }
                }]
              },
              data
            }, 'modal-primary', 'app/proxy/proxy.show.html');

            newModal.result.then(function (data) {});
          };
        }
      }
    };
  });
