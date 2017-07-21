import {
  each,
  debounce,
  isString,
  isFunction
} from 'lodash-es';
import Vue from 'vue';

const eventHub = new Vue();

eventHub.install = (_Vue) => {
  const originalEmit = Vue.prototype.$emit;

  _Vue.prototype.$emit = function(event, ...payload) {
    originalEmit.call(this, event, ...payload);
    originalEmit.call(eventHub, event, ...payload);
  };

  _Vue.mixin({
    beforeCreate() {
      const _this = this;
      if (!_this.$options.events) {
        return;
      }
      const eventsHandlers = _this._eventsHandlers = {};
      each(_this.$options.events, (handler, event) => {
        let fn;
        if (isFunction(handler)) {
          fn = handler;
        } else if (isString(handler)) {
          fn = _this.$options.methods[handler];
        } else {
          return;
        }
        eventsHandlers[event] = debounce((...args) => {
          fn.apply(_this, args);
        }, 50);
        _this.$on(event, eventsHandlers[event]);
        eventHub.$on(event, eventsHandlers[event]);
      });
    },
    beforeDestroy() {
      const _this = this;
      each(_this._eventsHandlers, (handler, event) => {
        eventHub.$off(event, handler);
      });
    }
  });
};

export default eventHub;
