import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    drafts: [],
    orders: [],
    inbox: [],
    inboxClient: []
  },
  mutations: {
    setDrafts(state, drafts){
      state.drafts = drafts;
    },
    setOrders(state, orders){
      state.orders = orders;
    },
    setInbox(state, inbox){
      state.inbox = inbox;
    },
    setInboxClient(state, inbox){
      state.inboxClient = inbox;
    }
  },
  actions: {
    async getDrafts({ commit }){
      let resp = await axios.get(`https://demo-server-100.herokuapp.com/api/drafts`);
      commit('setDrafts', resp.data)
    },
    async getOrders({ commit }){
      let resp = await axios.get(`https://demo-server-100.herokuapp.com/api/orders`);
      commit('setOrders', resp.data)
    },
    async postDraft(){
      let resp = await axios.post(`https://demo-server-100.herokuapp.com`);      
      console.log(resp) 
    },
    async postOrder(ctx, id) {
      let resp = await axios.post(`https://demo-server-100.herokuapp.com/api/orders/${id}`);
      console.log(resp) 
    },
    async postContactsResponse(ctx, contactsResponse) {
      let resp = await axios.post(`/api/mailbox/client`, { response: contactsResponse.text });
      console.log(resp) 
    },
    async postClientResponse(ctx, clientResponse) {
      let resp = await axios.post(`/api/mailbox/contacts`, { response: clientResponse.text });
      console.log(resp) 
    },
    async getInboxClient({ commit }){
      let resp = await axios.get(`/api/mailbox/client`);
      commit('setInboxClient', resp.data)
    },
    async getInbox({ commit }){
      let resp = await axios.get(`https://demo-server-100.herokuapp.com/api/mailbox`);
      commit('setInbox', resp.data)
    }
  },
  modules: {
  }
})
