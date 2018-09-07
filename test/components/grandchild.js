export default {
  methods: {
    sayHello() {
      this.$emit('hello', 'Grandchild');
      this.$emit('increaseCount');
    }
  },

  render: h => h('div')
};
