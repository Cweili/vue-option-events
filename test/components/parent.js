import A from './a';
import B from './b';

export default {
  components: {
    A,
    B
  },

  data: () => ({
    from: '',
    count: 0
  }),

  methods: {
    sayHello() {
      this.$emit('hello', 'Parent');
      this.$emit('increaseCount');
    }
  },

  events: {
    hello: {},
    increaseCount: true
  },

  render: h =>
    h('div', {}, [
      h('A', {
        ref: 'a'
      }),
      h('B', {
        ref: 'b'
      })
    ])
};
