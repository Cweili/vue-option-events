import {
  isString,
  isObject,
  isFunction,
  each,
} from './lib/utils';

const OPTION_NAME = 'events';
const HANDLER_MAP_NAME = '_eventHandlers';
const INACTIVE_NAME = '_eventInactive';

function offAll(eventBus, vm) {
  each(vm[HANDLER_MAP_NAME], (handler, event) => {
    eventBus.$off(event, handler);
  });
}

const eventBus = {
  install(Vue, {
    keepAlive = false,
  } = {}) {
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

    Vue.config.optionMergeStrategies[OPTION_NAME] = (to, from) => {
      if (!to) {
        return from;
      }
      if (!from) {
        return to;
      }
      return Vue.util.extend(to, from);
    };

    Vue.prototype.$event = eventBus;
    Vue.prototype.$emit = function $emit(event, ...payload) {
      originalEmit.call(this, event, ...payload);
      if (this != vue) {
        originalEmit.call(vue, event, ...payload);
      }
    };

    Vue.mixin({
      beforeCreate() {
        const vm = this;
        if (!isObject(vm.$options[OPTION_NAME])) {
          return;
        }
        const eventHandlers = vm[HANDLER_MAP_NAME] = {};
        each(vm.$options[OPTION_NAME], (handler, event) => {
          let fn;
          if (isFunction(handler)) {
            fn = handler;
          } else if (isString(handler)) {
            fn = vm.$options.methods[handler];
          }
          if (!isFunction(fn)) {
            Vue.util.warn(`handler for event "${event}" is not a function`, vm);
            return;
          }
          eventHandlers[event] = fn.bind(vm);
          eventBus.$on(event, eventHandlers[event]);
        });
      },
      activated() {
        const vm = this;
        if (!keepAlive && vm[INACTIVE_NAME]) {
          each(vm[HANDLER_MAP_NAME], (handler, event) => {
            eventBus.$on(event, handler);
          });
          vm[INACTIVE_NAME] = false;
        }
      },
      deactivated() {
        if (!keepAlive) {
          offAll(eventBus, this);
          this[INACTIVE_NAME] = true;
        }
      },
      beforeDestroy() {
        offAll(eventBus, this);
      },
    });
  },
};

export default eventBus;
