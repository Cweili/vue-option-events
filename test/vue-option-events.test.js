import { createLocalVue, mount } from '@vue/test-utils';
import vueOptionEvents from '../dist/vue-option-events.cjs';
import Parent from './components/parent';

describe('vue-option-events', () => {
  const localVue = createLocalVue();
  localVue.use(vueOptionEvents);

  let wrapper;
  let vm;

  beforeEach(() => {
    wrapper = mount(Parent, {
      localVue
    });
    vm = wrapper.vm;
  });
  afterEach(() => {
    wrapper.destroy();
  });

  it('should listen events from self', () => {
    const { a } = vm.$refs;
    a.sayHello();
    expect(a.from).toBe('A');
    expect(a.count).toBe(1);
  });

  it('should listen events from child', () => {
    const { a } = vm.$refs;
    a.$refs.grandchild.sayHello();
    expect(a.from).toBe('Grandchild');
    expect(a.count).toBe(1);
  });

  it('should listen events from brothers', () => {
    const { a, b } = vm.$refs;
    b.sayHello();
    expect(a.from).toBe('B');
    expect(a.count).toBe(1);
  });

  it('should listen events from parent', () => {
    const { a } = vm.$refs;
    vm.sayHello();
    expect(a.from).toBe('Parent');
    expect(a.count).toBe(1);
  });

  it("should ignore when listener isn't function or string", () => {
    vm.sayHello();
    expect(vm.from).toBe('');
    expect(vm.count).toBe(0);
  });
});
