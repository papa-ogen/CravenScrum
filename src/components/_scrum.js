/*jslint white: true */

var cravenScrum = {};

cravenScrum = (function (cs) {
  "use strict";

  // Node Modifiers
  cs.hasClass = function (element, cssClass) {
    return element.classList.contains(cssClass);
  };

  cs.addClass = function (element, cssClass) {
    element.classList.add(cssClass);
  };

  cs.removeClass = function (element, cssClass) {
    element.classList.remove(cssClass);
  };

  // JSON
  cs.getJSON = function (url, callback) {
    var xhr = new XMLHttpRequest();

    xhr.open("get", url, true);
    xhr.responseType = "json";

    xhr.onload = function () {
      var status = xhr.status;

      if (status === 200) {
        callback(null, xhr.response);
      } else {
        callback(status);
      }
    };

    xhr.send();
  };

  return cs;

} (cravenScrum || {}));