(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue')) :
  typeof define === 'function' && define.amd ? define(['vue'], factory) :
  (global.vueOptionEvents = factory(global.Vue));
}(this, (function (Vue) { 'use strict';

  Vue = Vue && Vue.hasOwnProperty('default') ? Vue['default'] : Vue;

  /**
   * vue-option-events
   */

  function isString(value) {
    if (typeof value === 'string') {
      return true;
    }
    if (typeof value !== 'object') {
      return false;
    }
    return Object.prototype.toString.call(value) === '[object String]';
  }

  function isObject(value) {
    var type = typeof value;
    return value != null && (type == 'object' || type == 'function');
  }

  function isFunction(value) {
    if (!isObject(value)) {
      return false;
    }
    // The use of `Object#toString` avoids issues with the `typeof` operator
    // in Safari 9 which returns 'object' for typed arrays and other constructors.
    var tag = Object.prototype.toString.call(value);
    var asyncTag = '[object AsyncFunction]';
    var funcTag = '[object Function]';
    var genTag = '[object GeneratorFunction]';
    var proxyTag = '[object Proxy]';
    return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
  }

  function each(collection, handler) {
    return collection && (Array.isArray(collection) ? collection.forEach(handler) : Object.keys(collection).forEach(function (key) {
      return handler(collection[key], key);
    }));
  }

  var eventHub = new Vue();

  eventHub.install = function (_Vue) {
    var originalEmit = _Vue.prototype.$emit;

    _Vue.prototype.$emit = function (event) {
      for (var _len = arguments.length, payload = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        payload[_key - 1] = arguments[_key];
      }

      originalEmit.call.apply(originalEmit, [this, event].concat(payload));
      if (this != eventHub) {
        originalEmit.call.apply(originalEmit, [eventHub, event].concat(payload));
      }
    };

    _Vue.mixin({
      beforeCreate: function beforeCreate() {
        var _this = this;
        if (!_this.$options.events) {
          return;
        }
        var eventsHandlers = _this._eventsHandlers = {};
        each(_this.$options.events, function (handler, event) {
          var fn = void 0;
          if (isFunction(handler)) {
            fn = handler;
          } else if (isString(handler)) {
            fn = _this.$options.methods[handler];
          } else {
            return;
          }
          eventsHandlers[event] = function () {
            for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
              args[_key2] = arguments[_key2];
            }

            fn.apply(_this, args);
          };
          eventHub.$on(event, eventsHandlers[event]);
        });
      },
      beforeDestroy: function beforeDestroy() {
        each(this._eventsHandlers, function (handler, event) {
          eventHub.$off(event, handler);
        });
      }
    });
  };

  return eventHub;

})));
