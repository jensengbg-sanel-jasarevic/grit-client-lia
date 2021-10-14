import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex';
import Inbox from '@/components/Inbox.vue'

const localVue = createLocalVue()
localVue.use(Vuex);

describe('Inbox.vue', () => {
    let store;

    let actions;

    beforeEach(() => {

      actions = {
        postMsgToContacts: jest.fn()
      };

      store = new Vuex.Store({
        actions
      })
})

  it('should ensure that components method have been called when clicking button', async () => {
  // Arrange
  const componentMethod = jest.spyOn(Inbox.methods, 'emitMessage')
  const wrapper = shallowMount(Inbox, { 
    localVue,
    store,
    propsData: {
      msg: { id: 1 }
    }       
  })

  // Act
  await wrapper.find('.inbox-submit-btn').trigger('submit')

  /// Assert
  expect(componentMethod).toHaveBeenCalled()
  })

  it('should check if textarea field store correct value in components data property', async () => {
    // Arrange
    const wrapper = shallowMount(Inbox, { 
      propsData: {
        msg: { id: 1 }
      }       
    })
    const expected = "Store this text"

    // Act
    const input = wrapper.find('textarea')
    await input.setValue("Store this text")
    const actual = wrapper.vm.textareaMessage
    
    // Assert
    expect(actual).toBe(expected)
  })

  it('should when mounted display correct text message via components props data', () => {
    // Arrange
    const wrapper = shallowMount(Inbox, {
      propsData: {
        msg: { messages: "lorem ipsum" }
      }
    })
    const expected = wrapper.props().msg.messages

    // Act
    const actual = wrapper.find('.inbox-msg-font').text()

    // Assert
    expect(actual).toBe(expected)
  })

})