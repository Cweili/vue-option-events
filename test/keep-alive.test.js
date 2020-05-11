import { createLocalVue, mount } from '@vue/test-utils';
import vueOptionEvents from '../vue-option-events';
import Parent from './components/parent';

describe('vue-option-events keepAlive', () => {
  const localVue = createLocalVue();
  localVue.use(vueOptionEvents, {
    keepAlive: true,
  });

  let wrapper;
  let vm;

  beforeEach(() => {
    wrapper = mount(Parent, {
      localVue,
    });
    vm = wrapper.vm; // eslint-disable-line prefer-destructuring
  });
  afterEach(() => {
    wrapper.destroy();
  });

  it('should triggered if component instance inactive', () => new Promise((done) => {
    const { a } = vm.$refs;
    vm.sayHello();
    expect(a.count).toBe(1);
    expect(vm.countFromA).toBe(1);
    vm.deactivatedA();
    vm.$nextTick(() => {
      vm.sayHello();
      expect(vm.countFromA).toBe(2);
      done();
    });
  }));
});
