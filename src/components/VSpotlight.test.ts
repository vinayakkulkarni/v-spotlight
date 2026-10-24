import { mount } from '@vue/test-utils';
import { afterEach, describe, expect, it, vi } from 'vite-plus/test';
import VSpotlight from './VSpotlight.vue';

const fire = (type: string, init: MouseEventInit) => {
  window.dispatchEvent(new MouseEvent(type, init));
};

describe('VSpotlight', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the overlay', () => {
    const wrapper = mount(VSpotlight);
    expect(wrapper.classes()).toContain('radial');
    wrapper.unmount();
  });

  it('moves the spotlight to the cursor', () => {
    const wrapper = mount(VSpotlight, { attachTo: document.body });
    fire('mousemove', { clientX: 100, clientY: 50 });
    const style = (wrapper.element as HTMLElement).style.backgroundImage;
    expect(style).toContain('radial-gradient');
    expect(style).toContain('160px');
    wrapper.unmount();
  });

  it('shrinks the spotlight while the primary button is held', () => {
    const wrapper = mount(VSpotlight, { attachTo: document.body });
    const el = wrapper.element as HTMLElement;
    fire('mousedown', { button: 0 });
    expect(el.style.backgroundImage).toContain('130px');
    fire('mouseup', { button: 0 });
    expect(el.style.backgroundImage).toContain('160px');
    wrapper.unmount();
  });

  it('ignores non-primary buttons', () => {
    const wrapper = mount(VSpotlight, { attachTo: document.body });
    const el = wrapper.element as HTMLElement;
    fire('mousedown', { button: 2 });
    expect(el.style.backgroundImage).toBe('');
    wrapper.unmount();
  });

  it('removes every window listener on unmount', () => {
    const add = vi.spyOn(window, 'addEventListener');
    const remove = vi.spyOn(window, 'removeEventListener');
    const wrapper = mount(VSpotlight);
    wrapper.unmount();
    const added = add.mock.calls.map(([type, fn]) => [type, fn]);
    const removed = remove.mock.calls.map(([type, fn]) => [type, fn]);
    expect(added).toHaveLength(3);
    expect(removed).toEqual(added);
  });
});
