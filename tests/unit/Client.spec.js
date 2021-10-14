import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex';
import Client from '@/views/Client.vue'
import DraftInfo from '@/components/DraftInfo.vue'

const localVue = createLocalVue()
localVue.use(Vuex);

describe('Client.vue', () => {
  let store;

	let state;
  let actions;

  beforeEach(() => {
		state = {
			drafts: [
        { id: 1, filename: "image.png" }
      ]
		}

    actions = {
			getDrafts: jest.fn(),
      getImage: jest.fn()
		};

  store = new Vuex.Store({
    state,
    actions
    })
})

  it('should when mounted dispatch action to Vuex store', () => {
    // Arrange
     shallowMount(Client, {
      localVue,
      store,
      stubs: ['router-link']
    })

    // Act
    const actual = actions.getDrafts

    // Assert
    expect(actual).toHaveBeenCalled();
  })

  it('should when mounted render correct data from Vuex store state via computed property', () => {
    // Arrange
    const wrapper = shallowMount(Client, {
      localVue,
      store,
      stubs: ['router-link']
    })
    const expected = [ { id: 1, filename: "image.png" } ]

    // Act
    const actual = wrapper.vm.drafts

    // Assert
    expect(actual).toStrictEqual(expected);
  })

  it('should when mounted have child component "DraftInfo"', () => {
    // Arrange
    const wrapper = mount(Client, {
      localVue,
      store,
      stubs: ['router-link']
    })
    const expected = "DraftInfo"

    // Act
    const findComponent = wrapper.findComponent(DraftInfo);
    const actual = findComponent.selector.name

    // Assert
    expect(actual).toBe(expected)
  })

})