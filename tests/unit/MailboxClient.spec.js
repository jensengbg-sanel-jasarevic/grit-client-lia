import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex';
import MailboxClient from '@/views/MailboxClient.vue'
import Inbox from '@/components/Inbox.vue'

const localVue = createLocalVue()
localVue.use(Vuex);

describe('MailboxClient.vue', () => {
  let store;

  let state;
  let actions;

  beforeEach(() => {
	state = {
		mailbox: [ { id: 3  } ]
	}

    actions = {
      getMailbox: jest.fn(),
      getDrafts: jest.fn(),
      getRejectedDrafts: jest.fn(),
      getOrders: jest.fn()
	};

  store = new Vuex.Store({
    state,
    actions
    })
})

it('should when mounted dispatch action to Vuex store', () => {
    // Arrange
     shallowMount(MailboxClient, {
      localVue,
      store
    })

    // Act
    const actual = actions.getMailbox

    // Assert
    expect(actual).toHaveBeenCalled();
  })

  it('should when mounted have child component "Inbox"', () => {
    // Arrange
    const wrapper = mount(MailboxClient, {
       mocks: {
        $store: {
         dispatch: function() { },
         state: { 
           mailbox: [] 
          }
        }
      }
    })
    const expected = "Inbox"

    // Act
    const findComponent = wrapper.findComponent(Inbox);
    const actual = findComponent.selector.name

    // Assert
    expect(actual).toBe(expected)
  })

})