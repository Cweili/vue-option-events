import Grandchild from './grandchild';
import increaseCountMixin from './increase-count-mixin';

export default {
  name: 'A',

  mixins: [increaseCountMixin],

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
  },

  render: h => h('div', {}, [
    h('Grandchild', {
      ref: 'grandchild',
    }),
  ]),
};
