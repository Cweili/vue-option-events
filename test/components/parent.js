import A from './a';
import B from './b';

export default {
  components: {
    A,
    B
  },

  data: () => ({
    from: '',
    count: 0,
    hasA: true,
    countFromA: 0
  }),

  methods: {
    sayHello() {
      this.$emit('hello', 'Parent');
      this.$emit('increaseCount');
    },
    destroyA() {
      this.hasA = false;
    }
  },

  events: {
    hello: {}, // invalid
    increaseCount: true, // invalid
    increaseCountFromA() {
      this.countFromA++;
    }
  },

  render(h) {
    return h('div', {}, [
      this.hasA
        ? h('A', {
            ref: 'a'
          })
        : '',
      h('B', {
        ref: 'b'
      })
    ]);
  }
};
