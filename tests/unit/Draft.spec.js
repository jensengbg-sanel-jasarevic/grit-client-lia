import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex';
import Draft from '@/components/Draft.vue'

const localVue = createLocalVue()
localVue.use(Vuex);

describe('Draft.vue', () => {
  let store;

  let actions;
    
  beforeEach(() => {

      actions = {
        getImage: jest.fn(),
        postMailbox: jest.fn(),
        postOrder: jest.fn(),
        removeDraft: jest.fn()
      };

      store = new Vuex.Store({
          actions
        });
  });

  it('should when mounted dispatch action to Vuex store', async () => {
    // Arrange
    const wrapper = shallowMount(Draft, {
      localVue,
      store,
      propsData: {
        draft: { id: 1 }
      } 
    });

    // Act
    const actual = actions.getImage

    // Assert
    expect(actual).toHaveBeenCalled();
  });

  it('should ensure that components method have been called when clicking button', async () => {
    // Arrange
    const componentMethod = jest.spyOn(Draft.methods, 'postOrder')
    const wrapper = shallowMount(Draft, { 
      localVue,
      store,
      propsData: {
        draft: { id: 1, sender: "grit", filename: "qwe.png" }
      }       
    })
  
    // Act
    await wrapper.find('#approve-btn').trigger('click')
  
    /// Assert
    expect(componentMethod).toHaveBeenCalled()
    })
/*
  it('should check if textarea field store correct value in components data property', async () => {
    // Arrange
    const wrapper = shallowMount(DraftInfo, { 
      localVue,
      store,
      propsData: {
        draft: { id: 1 }
      }       
    })
    const expected = "Comment from client"

    // Act
    const input = wrapper.find('textarea')
    await input.setValue("Comment from client")
    const actual = wrapper.vm.textareaInput
    
    // Assert
    expect(actual).toBe(expected)
  })    
*/
}) 