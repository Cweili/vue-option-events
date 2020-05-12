# vue-option-events

[![npm][badge-version]][npm]
[![bundle size][badge-size]][bundlephobia]
[![npm downloads][badge-downloads]][npm]
[![license][badge-license]][license]


[![github][badge-issues]][github]
[![build][badge-build]][travis]
[![coverage][badge-coverage]][codecov]

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

## Options

```js
Vue.use(vueOptionEvents, {
  keepAlive: false
});
```

- `keepAlive` enable if you want keep handling events on inactive [keep-alive components](https://vuejs.org/v2/api/#keep-alive), default `false`

[badge-version]: https://img.shields.io/npm/v/vue-option-events.svg
[badge-downloads]: https://img.shields.io/npm/dt/vue-option-events.svg
[npm]: https://www.npmjs.com/package/vue-option-events

[badge-size]: https://img.shields.io/bundlephobia/minzip/vue-option-events.svg
[bundlephobia]: https://bundlephobia.com/result?p=vue-option-events

[badge-license]: https://img.shields.io/npm/l/vue-option-events.svg
[license]: https://github.com/Cweili/vue-option-events/blob/master/LICENSE

[badge-issues]: https://img.shields.io/github/issues/Cweili/vue-option-events.svg
[github]: https://github.com/Cweili/vue-option-events

[badge-build]: https://img.shields.io/travis/com/Cweili/vue-option-events/master.svg
[travis]: https://travis-ci.com/Cweili/vue-option-events

[badge-coverage]: https://img.shields.io/codecov/c/github/Cweili/vue-option-events/master.svg
[codecov]: https://codecov.io/gh/Cweili/vue-option-events
