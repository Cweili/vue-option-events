export default {
  methods: {
    sayHello() {
      this.$emit('hello', 'B');
      this.$emit('increaseCount');
    }
  },

  render: h => h('div')
};
