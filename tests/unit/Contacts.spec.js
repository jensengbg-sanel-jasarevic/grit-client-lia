import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex';
import Contacts from '@/views/Contacts.vue'
import UploadFile from '@/components/UploadFile.vue'
import OrdersList from '@/components/OrdersList.vue'

const localVue = createLocalVue()
localVue.use(Vuex);

describe('Contacts.vue', () => {
  let store;

  let state;
  let actions;

  beforeEach(() => {
		state = {
			orders: [ { id: 7 } ]
		}

    actions = {
			getOrders: jest.fn(),
		};

  store = new Vuex.Store({
    state,
    actions
    })
})

  it('should when mounted have child components "UploadFile" & "OrdersList"', () => {
    // Arrange
    const wrapper = mount(Contacts, {
      localVue,
      store
    })
    const expected = ["UploadFile", "OrdersList"]
    let actual = []
    
    // Act
    const componentOne = wrapper.findComponent(UploadFile).selector.name;
    const componentTwo = wrapper.findComponent(OrdersList).selector.name;
    actual.push(componentOne, componentTwo)

    // Assert
    expect(actual).toStrictEqual(expected)
  })

  it('should when mounted render correct data from Vuex store state via computed property', () => {
    // Arrange
    const wrapper = shallowMount(Contacts, {
      localVue,
      store
    })
    const expected = [ { id: 7 } ]

    // Act
    const actual = wrapper.vm.orders

    // Assert
    expect(actual).toStrictEqual(expected);
  })

  it('should when mounted dispatch action to Vuex store', () => {
    // Arrange
     shallowMount(Contacts, {
      localVue,
      store
    })

    // Act
    const actual = actions.getOrders

    // Assert
    expect(actual).toHaveBeenCalled();
  })

})