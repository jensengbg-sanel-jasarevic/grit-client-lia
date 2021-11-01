import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex';
import Order from '@/components/Order.vue'

const localVue = createLocalVue()
localVue.use(Vuex);

describe('Order', () => {

  it('should when component mounted render the correct order ID via props data', async () => {
    // Arrange
    const wrapper = shallowMount(Order, { 
      propsData: {
        order: { id: 22 }
      }      
    })
    const expected = 22
  
    // Act
    const actual = wrapper.find('#order-id').text()
  
    /// Assert
    expect(actual).toContain(expected)
    })  

}) 