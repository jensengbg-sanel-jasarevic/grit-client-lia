import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    sketches: [],
    drafts: [],
    orders: []
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
    }
  },
  actions: {
    async getSketches({ commit }){
      let resp = await axios.get(`https://demo-server-100.herokuapp.com/api/sketches`);
      commit('setSketches', resp.data)
    },
    async getDrafts({ commit }){
      let resp = await axios.get(`https://demo-server-100.herokuapp.com/api/drafts`);
      commit('setDrafts', resp.data)
    },
    async getOrders({ commit }){
      let resp = await axios.get(`https://demo-server-100.herokuapp.com/api/orders`);
      commit('setOrders', resp.data)
    },
    async postSketchDraft(){
      let resp = await axios.post(`https://demo-server-100.herokuapp.com/`);      
      console.log(resp) 
    },
    async updateSketch(ctx, update) {
      let resp = await axios.patch(`https://demo-server-100.herokuapp.com/api/sketches/${update.id}`, {
        changes: update.changes
      });
      console.log(resp) 
    },
    async deleteDraft(ctx, id) {
      let resp = await axios.delete(`https://demo-server-100.herokuapp.com/api/drafts/${id}`);
      console.log(resp) 
    }, 
    async postOrder(ctx, id) {
      let resp = await axios.post(`https://demo-server-100.herokuapp.com/api/orders/${id}`);
      console.log(resp) 
    }
  },
  modules: {
  }
})
