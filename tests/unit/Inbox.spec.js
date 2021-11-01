import { shallowMount } from '@vue/test-utils'
import Inbox from '@/components/Inbox.vue'

describe('Inbox.vue', () => {

  it('should ensure that components method have been called when clicking button', async () => {
  // Arrange
  const componentMethod = jest.spyOn(Inbox.methods, 'emitMessage')
  const wrapper = shallowMount(Inbox, { 
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
    const expected = "Store text"

    // Act
    const input = wrapper.find('textarea')
    await input.setValue("Store text")
    const actual = wrapper.vm.textareaMessage
    
    // Assert
    expect(actual).toBe(expected)
  })

  it('should when mounted display correct text message via components props data', () => {
    // Arrange
    const wrapper = shallowMount(Inbox, {
      propsData: {
        msg: { message: "lorem ipsum" }
      }
    })
    const expected = wrapper.props().msg.message

    // Act
    const actual = wrapper.find('.inbox-msg-font').text()

    // Assert
    expect(actual).toBe(expected)
  })

})