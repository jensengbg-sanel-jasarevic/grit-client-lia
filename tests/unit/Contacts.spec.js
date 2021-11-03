import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex';
import Contacts from '@/views/Contacts.vue'
import UploadFile from '@/components/UploadFile.vue'

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
      verifyActiveUser: jest.fn(),
      getMailbox: jest.fn(),
			getOrders: jest.fn()
		};

  store = new Vuex.Store({
    state,
    actions
    })
})

  it('should when mounted have child component "UploadFile"', () => {
    // Arrange
    const wrapper = mount(Contacts, {
      localVue,
      store,
      stubs: ['router-link']
    })
    const expected = "UploadFile"
    
    // Act
    const findComponent = wrapper.findComponent(UploadFile)
    const actual = findComponent.selector.name

    // Assert
    expect(actual).toStrictEqual(expected)
  })

})