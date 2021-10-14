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
            getOrders: jest.fn(),
            getInboxClient: jest.fn(),
            getInboxContacts: jest.fn(),
            getRejectedDrafts: jest.fn()
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
    const getOrders = actions.getOrders
    const getInboxClient = actions.getInboxClient
    const getInboxContacts = actions.getInboxContacts

    // Assert
    expect(getDrafts).toHaveBeenCalled()
    expect(getOrders).toHaveBeenCalled()
    expect(getInboxClient).toHaveBeenCalled()
    expect(getInboxContacts).toHaveBeenCalled()
  })

})