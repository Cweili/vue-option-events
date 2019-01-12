/**
 * vue-option-events
 */
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

const eventBus = {
  install(Vue) {
    const originalEmit = Vue.prototype.$emit;
    const vue = new Vue();

    each([
      '$on',
      '$once',
      '$off',
      '$emit',
    ], (name) => {
      eventBus[name] = vue[name].bind(vue);
    });

    Vue.prototype.$event = eventBus;
    Vue.prototype.$emit = function $emit(event, ...payload) {
      originalEmit.call(this, event, ...payload);
      if (this != vue) {
        originalEmit.call(vue, event, ...payload);
      }
    };

    Vue.mixin({
      beforeCreate() {
        const _this = this;
        if (!_this.$options.events) {
          return;
        }
        const eventHandlers = _this._eventHandlers = {};
        each(_this.$options.events, (handler, event) => {
          let fn;
          if (isFunction(handler)) {
            fn = handler;
          } else if (isString(handler)) {
            fn = _this.$options.methods[handler];
          } else {
            return;
          }
          eventHandlers[event] = fn.bind(_this);
          eventBus.$on(event, eventHandlers[event]);
        });
      },
      beforeDestroy() {
        each(this._eventHandlers, (handler, event) => {
          eventBus.$off(event, handler);
        });
      },
    });
  },
};

export default eventBus;
