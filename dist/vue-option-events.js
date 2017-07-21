/**
 * vue-option-events
 */
import { each, debounce, isString, isFunction } from 'lodash-es';
import Vue from 'vue';

var eventHub = new Vue();

eventHub.install = function (_Vue) {
  var originalEmit = Vue.prototype.$emit;

  _Vue.prototype.$emit = function (event) {
    for (var _len = arguments.length, payload = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      payload[_key - 1] = arguments[_key];
    }

    originalEmit.call.apply(originalEmit, [this, event].concat(payload));
    originalEmit.call.apply(originalEmit, [eventHub, event].concat(payload));
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
        eventsHandlers[event] = debounce(function () {
          for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          fn.apply(_this, args);
        }, 50);
        _this.$on(event, eventsHandlers[event]);
        eventHub.$on(event, eventsHandlers[event]);
      });
    },
    beforeDestroy: function beforeDestroy() {
      var _this = this;
      each(_this._eventsHandlers, function (handler, event) {
        eventHub.$off(event, handler);
      });
    }
  });
};

export default eventHub;