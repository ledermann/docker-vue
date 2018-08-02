import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import LayoutBasic from '@/layouts/LayoutBasic.vue'

describe('LayoutBasic.vue', () => {
  it('renders hero section', () => {
    const wrapper = shallowMount(LayoutBasic, {
    })
    expect(wrapper.html()).to.include('<section class="hero is-info">')
  })
})
