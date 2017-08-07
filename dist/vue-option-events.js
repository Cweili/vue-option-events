import _isFunction from 'lodash-es/isFunction';
import _isString from 'lodash-es/isString';
import _each from 'lodash-es/each'; /**
                                     * vue-option-events
                                     */

import Vue from 'vue';

var eventHub = new Vue();

eventHub.install = function (_Vue) {
  var originalEmit = _Vue.prototype.$emit;

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
      _each(_this.$options.events, function (handler, event) {
        var fn = void 0;
        if (_isFunction(handler)) {
          fn = handler;
        } else if (_isString(handler)) {
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
        _this.$on(event, eventsHandlers[event]);
        eventHub.$on(event, eventsHandlers[event]);
      });
    },
    beforeDestroy: function beforeDestroy() {
      var _this = this;
      _each(_this._eventsHandlers, function (handler, event) {
        eventHub.$off(event, handler);
      });
    }
  });
};

export default eventHub;