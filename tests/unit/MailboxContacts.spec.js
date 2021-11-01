import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex';
import MailboxContacts from '@/views/MailboxContacts.vue'
import Inbox from '@/components/Inbox.vue'

const localVue = createLocalVue()
localVue.use(Vuex);

describe('MailboxContacts.vue', () => {
  let store;

  let state;
  let actions;

  beforeEach(() => {
	state = {
		mailbox: [ { id: 9 } ]
	}

    actions = {
      getMailbox: jest.fn(),
      getOrders: jest.fn()
	  };

  store = new Vuex.Store({
    state,
    actions
    })
})

it('should when mounted dispatch action to Vuex store', () => {
    // Arrange
     shallowMount(MailboxContacts, {
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
    const wrapper = mount(MailboxContacts, {
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