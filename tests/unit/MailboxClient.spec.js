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
		inboxClient: [ { id: 3 } ]
	}

    actions = {
        getInboxClient: jest.fn(),
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
    const actual = actions.getInboxClient

    // Assert
    expect(actual).toHaveBeenCalled();
  })

  it('should when mounted render correct data from Vuex store state via computed property', () => {
    // Arrange
    const wrapper = shallowMount(MailboxClient, {
      localVue,
      store
    })
    const expected = [ { id: 3 } ]

    // Act
    const actual = wrapper.vm.inboxClient

    // Assert
    expect(actual).toStrictEqual(expected);
  })

  it('should when mounted have child component "Inbox"', () => {
    // Arrange
    const wrapper = mount(MailboxClient, {
       mocks: {
        $store: {
         dispatch: function() { },
         state: { 
           inboxClient: [] 
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