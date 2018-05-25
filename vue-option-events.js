/**
 * vue-option-events
 */
import Vue from 'vue';

function isString(value) {
	if (typeof value === 'string') { return true; }
	if (typeof value !== 'object') { return false; }
	return Object.prototype.toString.call(value) === '[object String]';
}

function isObject(value) {
  const type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  const tag = Object.prototype.toString.call(value);
  const asyncTag = '[object AsyncFunction]';
  const funcTag = '[object Function]';
  const genTag = '[object GeneratorFunction]';
  const proxyTag = '[object Proxy]';
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

function each(collection, handler) {
  return collection && (Array.isArray(collection)
    ? collection.forEach(handler)
    : Object.keys(collection).forEach(key => handler(collection[key], key)));
}

const eventHub = new Vue();

eventHub.install = (_Vue) => {
  const originalEmit = _Vue.prototype.$emit;

  _Vue.prototype.$emit = function(event, ...payload) {
    originalEmit.call(this, event, ...payload);
    if (this != eventHub) {
      originalEmit.call(eventHub, event, ...payload);
    }
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
        eventsHandlers[event] = (...args) => {
          fn.apply(_this, args);
        };
        _this.$on(event, eventsHandlers[event]);
        eventHub.$on(event, eventsHandlers[event]);
      });
    },
    beforeDestroy() {
      each(this._eventsHandlers, (handler, event) => {
        eventHub.$off(event, handler);
      });
    }
  });
};

export default eventHub;
