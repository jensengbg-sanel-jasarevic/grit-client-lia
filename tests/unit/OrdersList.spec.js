import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex';
import OrdersList from '@/components/OrdersList.vue'

const localVue = createLocalVue()
localVue.use(Vuex);

describe('OrdersList', () => {

  it('should when component mounted render the correct order ID via props data', async () => {
    // Arrange
    const wrapper = shallowMount(OrdersList, { 
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