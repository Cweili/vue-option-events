import Grandchild from './grandchild';

export default {
  name: 'A',

  components: {
    Grandchild,
  },

  data: () => ({
    from: '',
    count: 0,
  }),

  methods: {
    increaseCount() {
      this.count++;
      this.$emit('increaseCountFromA');
    },
    sayHello() {
      this.$emit('hello', 'A');
      this.$emit('increaseCount');
    },
  },

  events: {
    hello(from) {
      this.from = from;
    },
    increaseCount: 'increaseCount',
  },

  render: h => h('div', {}, [
    h('Grandchild', {
      ref: 'grandchild',
    }),
  ]),
};
