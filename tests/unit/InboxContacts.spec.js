import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex';
import InboxContacts from '@/components/InboxContacts.vue'

const localVue = createLocalVue()
localVue.use(Vuex);

describe('InboxContacts.vue', () => {
    let store;

    let actions;

    beforeEach(() => {

      actions = {
        postMsgToClient: jest.fn()
      };

      store = new Vuex.Store({
        actions
      })
})

  it('should ensure that components method have been called when clicking button', async () => {
  // Arrange
  const componentMethod = jest.spyOn(InboxContacts.methods, 'postMessage')
  const wrapper = shallowMount(InboxContacts, { 
    localVue,
    store,
    propsData: {
        msg: { id: 1, messages: "Message from client" }
    }       
  })

  // Act
  await wrapper.find('.submit-msg').trigger('submit')

  /// Assert
  expect(componentMethod).toHaveBeenCalled()
  })

  it('should check if textarea field store correct value in components data property', async () => {
    // Arrange
    const wrapper = shallowMount(InboxContacts, { 
      propsData: {
        msg: { id: 1, messages: "Message from client" }
      }       
    })
    const expected = "Store response text"

    // Act
    const input = wrapper.find('textarea')
    await input.setValue("Store response text")
    const actual = wrapper.vm.contactsMessage
    
    // Assert
    expect(actual).toBe(expected)
  })

  it('should when mounted display correct text message via components props data', () => {
    // Arrange
    const wrapper = shallowMount(InboxContacts, {
      propsData: {
        msg: { messages: "lorem ipsum" }
      }
    })
    const expected = wrapper.props().msg.messages

    // Act
    const actual = wrapper.find('.inbox-contacts-font').text()

    // Assert
    expect(actual).toBe(expected)
  })

})