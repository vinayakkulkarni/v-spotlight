const Vue = require('vue');
const VSpotlight = require('v-spotlight');

function getComponent(Component, propsData) {
  const Ctor = Vue.extend(Component);
  return new Ctor({ propsData }).$mount();
}

describe('VSpotlight', function() {
  it('has correct DOM structure', function() {
    const vm = getComponent(VSpotlight);

    expect(vm.$el.nodeName).toBe('DIV');
  });
});
