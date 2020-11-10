import { shallowMount } from '@vue/test-utils';
import Home from '../../src/components/Home.vue';

describe('Testing Home Component', () => {
    const wrapper = shallowMount(Home);

    it('Correctly displays Home', () => {
        expect(wrapper.vm.pageTitle).toBe('Home');
    })
})