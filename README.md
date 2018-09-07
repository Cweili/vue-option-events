# vue-option-events

[![npm][npm-version]][npm]
[![npm][npm-downloads]][npm]
[![npm][npm-license]][npm]

[![github][github-issues]][github]
[![travis][travis-build]][travis]
[![codecov][codecov-svg]][codecov]

Bring Vue 1 events option and $emit to Vue 2.

## Install

```
npm install vue-option-events --save
```

## Basic Usage

### Install plugin

```js
import Vue from 'vue';
import vueOptionEvents from 'vue-option-events';

Vue.use(vueOptionEvents);
```

### Set `events` option

Component A

```js
new Vue({
  methods: {
    show(hiMessage) {
      console.log(hiMessage);
    }
  },

  events: {
    hello(helloMessage) {
      console.log(helloMessage);
    },
    hi: 'show'
  }
});
```

Component B

```js
new Vue({
  methods: {
    send() {
      this.$emit('hello', 'world');
      this.$emit('hi', 'world');
    }
  }
});
```

[npm]: https://www.npmjs.com/package/vue-option-events
[npm-version]: https://img.shields.io/npm/v/vue-option-events.svg
[npm-downloads]: https://img.shields.io/npm/dt/vue-option-events.svg
[npm-license]: https://img.shields.io/npm/l/vue-option-events.svg
[github]: https://github.com/Cweili/vue-option-events
[github-issues]: https://img.shields.io/github/issues/Cweili/vue-option-events.svg
[travis]: https://travis-ci.org/Cweili/vue-option-events
[travis-build]: https://img.shields.io/travis/Cweili/vue-option-events.svg
[codecov]: https://codecov.io/gh/Cweili/vue-option-events
[codecov-svg]: https://img.shields.io/codecov/c/github/Cweili/vue-option-events.svg
