# vue-option-events

[![npm][npm-version]][npm]
[![npm][npm-size]][npm]
[![npm][npm-downloads]][npm]
[![npm][npm-license]][npm]

[![github][github-issues]][github]
[![travis][travis-build]][travis]
[![codecov][codecov-svg]][codecov]

Bring Vue.js 1 events option and $emit to Vue.js 2.

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

### Use as global event bus

```js
new Vue({
  methods: {
    send() {
      this.$event.$emit('hello', 'world');
    }
  }
});
```

### Emit events from any where

```js
import eventBus from 'vue-option-events';

eventBus.$emit('hello', 'world');
```

[npm]: https://www.npmjs.com/package/vue-option-events
[npm-version]: https://img.shields.io/npm/v/vue-option-events.svg
[npm-size]: https://img.shields.io/bundlephobia/minzip/vue-option-events.svg
[npm-downloads]: https://img.shields.io/npm/dt/vue-option-events.svg
[npm-license]: https://img.shields.io/npm/l/vue-option-events.svg

[github]: https://github.com/Cweili/vue-option-events
[github-issues]: https://img.shields.io/github/issues/Cweili/vue-option-events.svg

[travis]: https://travis-ci.org/Cweili/vue-option-events
[travis-build]: https://travis-ci.org/Cweili/vue-option-events.svg?branch=master

[codecov]: https://codecov.io/gh/Cweili/vue-option-events
[codecov-svg]: https://img.shields.io/codecov/c/github/Cweili/vue-option-events.svg
