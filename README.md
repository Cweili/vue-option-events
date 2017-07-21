# vue-option-events

Bring Vue 1 events option and $emit to Vue 2.

[![npm](https://nodei.co/npm/vue-option-events.png?downloads=true&stars=true)](https://www.npmjs.com/package/vue-option-events)

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
    show(message) {
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
