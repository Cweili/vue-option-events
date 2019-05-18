import A from './a';
import B from './b';

export default {
  name: 'Parent',

  components: {
    A,
    B,
  },

  data: () => ({
    from: '',
    count: 0,
    hasA: true,
    activeA: true,
    countFromA: 0,
  }),

  methods: {
    sayHello() {
      this.$emit('hello', 'Parent');
      this.$emit('increaseCount');
    },
    destroyA() {
      this.hasA = false;
    },
    activatedA() {
      this.activeA = true;
    },
    deactivatedA() {
      this.activeA = false;
    },
  },

  events: {
    hello: {}, // invalid
    increaseCountFromA() {
      this.countFromA++;
    },
  },

  render(h) {
    return h('div', {}, [
      this.hasA
        ? h('keep-alive', {}, [
          this.activeA
            ? h('A', {
              ref: 'a',
            })
            : undefined,
        ])
        : undefined,
      h('B', {
        ref: 'b',
      }),
    ]);
  },
};
