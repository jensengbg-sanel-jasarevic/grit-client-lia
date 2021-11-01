import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex';
import UploadFile from '@/components/UploadFile.vue'

const localVue = createLocalVue()
localVue.use(Vuex);

describe('UploadFile.vue', () => {
  let store;

  let actions;
    
  beforeEach(() => {

      actions = {
        postDraft: jest.fn()
      };

      store = new Vuex.Store({
          actions
        });
  });

  it('should ensure that components method have been called when clicking button', async () => {
    // Arrange
    const componentMethod = jest.spyOn(UploadFile.methods, 'postDraft')
    const wrapper = shallowMount(UploadFile, { 
      localVue,
      store,
      data() {
        return {
          sendDraftBtn: true
        }
      }     
    })
  
    // Act
    await wrapper.find('#post-draft-btn').trigger('click')
  
    /// Assert
    expect(componentMethod).toHaveBeenCalled()
    })  

}) 