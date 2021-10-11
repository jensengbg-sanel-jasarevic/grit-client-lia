import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex';
import MailboxContacts from '@/views/MailboxContacts.vue'
import InboxContacts from '@/components/InboxContacts.vue'

const localVue = createLocalVue()
localVue.use(Vuex);

describe('MailboxContacts.vue', () => {
  let store;

  let state;
  let actions;

  beforeEach(() => {
	state = {
		inboxContacts: [ { id: 9 } ]
	}

    actions = {
        getInboxContacts: jest.fn(),
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
    const actual = actions.getInboxContacts

    // Assert
    expect(actual).toHaveBeenCalled();
  })

  it('should when mounted render correct data from Vuex store state via computed property', () => {
    // Arrange
    const wrapper = shallowMount(MailboxContacts, {
      localVue,
      store
    })
    const expected = [ { id: 9 } ]

    // Act
    const actual = wrapper.vm.inboxContacts

    // Assert
    expect(actual).toStrictEqual(expected);
  })

  it('should when mounted have child component "InboxContacts"', () => {
    // Arrange
    const wrapper = mount(MailboxContacts, {
       mocks: {
        $store: {
         dispatch: function() { },
         state: { 
           inboxContacts: [] 
          }
        }
      }
    })
    const expected = "InboxContacts"

    // Act
    const findComponent = wrapper.findComponent(InboxContacts);
    const actual = findComponent.selector.name

    // Assert
    expect(actual).toBe(expected)
  })

})