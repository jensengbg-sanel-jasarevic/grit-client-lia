import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    drafts: [],
    orders: [],
    inboxContacts: [],
    inboxClient: []
  },
  mutations: {
    setDrafts(state, drafts){
      state.drafts = drafts;
    },
    setOrders(state, orders){
      state.orders = orders;
    },
    setInboxContacts(state, inbox){
      state.inboxContacts = inbox;
    },
    setInboxClient(state, inbox){
      state.inboxClient = inbox;
    }
  },
  actions: {
    async getDrafts({ commit }){
      let resp = await axios.get(`https://nodeserver-100.herokuapp.com/api/drafts`);
      commit('setDrafts', resp.data)
    },
    async getOrders({ commit }){
      let resp = await axios.get(`https://nodeserver-100.herokuapp.com/api/orders`);
      commit('setOrders', resp.data)
    },
    async postDraft(){
      let resp = await axios.post(`https://nodeserver-100.herokuapp.com`);      
      console.log(resp) 
    },
    async postOrder(ctx, id) {
      let resp = await axios.post(`https://nodeserver-100.herokuapp.com/api/orders/${id}`);
      console.log(resp) 
    },
    async postMsgToClient(ctx, message) {
      let resp = await axios.post(`https://nodeserver-100.herokuapp.com/api/mailbox/client`, { text: message.text, textId: message.textId });
      console.log(resp) 
    },
    async postMsgToContacts(ctx, message) {
      let resp = await axios.post(`https://nodeserver-100.herokuapp.com/api/mailbox/contacts`, { text: message.text, textId: message.textId });
      console.log(resp) 
    },
    async getInboxClient({ commit }){
      let resp = await axios.get(`https://nodeserver-100.herokuapp.com/api/mailbox/client`);
      commit('setInboxClient', resp.data)
    },
    async getInboxContacts({ commit }){
      let resp = await axios.get(`https://nodeserver-100.herokuapp.com/api/mailbox/contacts`);
      commit('setInboxContacts', resp.data)
    }
  },
  modules: {
  }
})
