import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex';
import VueRouter from 'vue-router'
import App from '@/App.vue'

const localVue = createLocalVue()
localVue.use(Vuex);
localVue.use(VueRouter)

describe('App.vue', () => {
  let store;

  let actions;

  beforeEach(() => {

    actions = {
			getDrafts: jest.fn(),
      getRejectedDrafts: jest.fn(),
      getOrders: jest.fn(),
      getMailbox: jest.fn()
		};

  store = new Vuex.Store({
    actions
    })
})

it('should when mounted dispatch actions to Vuex store', () => {
    // Arrange
    shallowMount(App, { localVue, store })

    // Act
    const getDrafts = actions.getDrafts
    const getRejectedDrafts = actions.getRejectedDrafts
    const getOrders = actions.getOrders
    const getMailbox = actions.getMailbox

    // Assert
    expect(getDrafts).toHaveBeenCalled()
    expect(getRejectedDrafts).toHaveBeenCalled()
    expect(getOrders).toHaveBeenCalled()
    expect(getMailbox).toHaveBeenCalled()
  })

})