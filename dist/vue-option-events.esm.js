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

var eventBus = {
  install: function install(Vue) {
    var originalEmit = Vue.prototype.$emit;
    var vue = new Vue();

    each(['$on', '$once', '$off', '$emit'], function (name) {
      eventBus[name] = vue[name].bind(vue);
    });

    Vue.prototype.$event = eventBus;
    Vue.prototype.$emit = function $emit(event) {
      for (var _len = arguments.length, payload = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        payload[_key - 1] = arguments[_key];
      }

      originalEmit.call.apply(originalEmit, [this, event].concat(payload));
      if (this != vue) {
        originalEmit.call.apply(originalEmit, [vue, event].concat(payload));
      }
    };

    Vue.mixin({
      beforeCreate: function beforeCreate() {
        var _this = this;
        if (!_this.$options.events) {
          return;
        }
        var eventHandlers = _this._eventHandlers = {};
        each(_this.$options.events, function (handler, event) {
          var fn = void 0;
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
      beforeDestroy: function beforeDestroy() {
        each(this._eventHandlers, function (handler, event) {
          eventBus.$off(event, handler);
        });
      }
    });
  }
};

export default eventBus;
