export default {
  methods: {
    sayHello() {
      this.$emit('hello', 'Grandchild');
      this.$emit('increaseCount');
    },
    sayHelloFromGlobalEventBus() {
      this.$event.$emit('hello', 'GlobalEventBus');
      this.$event.$emit('increaseCount');
    }
  },

  render: h => h('div')
};
