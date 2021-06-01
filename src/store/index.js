import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    apiUrl: 'https://demo-server-100.herokuapp.com',
    sketches: [],
    drafts: [],
    orders: [],
    inbox: []
  },
  mutations: {
    setSketches(state, sketches){
      state.sketches = sketches;
    },
    setDrafts(state, drafts){
      state.drafts = drafts;
    },
    setOrders(state, orders){
      state.orders = orders;
    },
    setInbox(state, inbox){
      state.inbox = inbox;
    }
  },
  actions: {
    async getSketches({ commit }){
      let resp = await axios.get(`${apiUrl}/api/sketches`);
      commit('setSketches', resp.data)
    },
    async getDrafts({ commit }){
      let resp = await axios.get(`${apiUrl}/api/drafts`);
      commit('setDrafts', resp.data)
    },
    async getOrders({ commit }){
      let resp = await axios.get(`${apiUrl}/api/orders`);
      commit('setOrders', resp.data)
    },
    async postSketchDraft(){
      let resp = await axios.post(`${apiUrl}`);      
      console.log(resp) 
    },
    async deleteDraft(ctx, id) {
      let resp = await axios.delete(`${apiUrl}/api/drafts/${id}`);
      console.log(resp) 
    }, 
    async postOrder(ctx, id) {
      let resp = await axios.post(`${apiUrl}/api/orders/${id}`);
      console.log(resp) 
    },
    async postComment(ctx, comment) {
      let resp = await axios.post(`${apiUrl}/api/drafts/${comment.id}`, { comment: comment.text });
      console.log(resp) 
    },
    async getInbox({ commit }){
      let resp = await axios.get(`${apiUrl}/api/mailbox`);
      commit('setInbox', resp.data)
    }
  },
  modules: {
  }
})
