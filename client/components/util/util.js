angular.module('proxyManagerApp')
  .factory('Util', function () {
    var randomString = function (length) {
      var length = length || 8;
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for (var i = 0; i < length; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
    };
    return {
      randomString
    };
  })
