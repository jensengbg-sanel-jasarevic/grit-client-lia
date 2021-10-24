import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    API_URL: "http://nodeserver-100.herokuapp.com",
    drafts: null,
    rejectedDrafts: null,
    orders: null,
    inboxContacts: null,
    inboxClient: null,
    generatedKey: null,
    accountCreated: null
  },
  mutations: {
    setDrafts(state, drafts){
      state.drafts = drafts;
    },
    setRejectedDrafts(state, drafts){
      state.rejectedDrafts = drafts;
    },
    setOrders(state, orders){
      state.orders = orders;
    },
    setInboxContacts(state, inbox){
      state.inboxContacts = inbox;
    },
    setInboxClient(state, inbox){
      state.inboxClient = inbox;
    },
    setGeneratedKey(state, generatedKey){
      state.generatedKey = generatedKey;
    },
    setAccountCreated(state, text){
      state.accountCreated = text;
    }
  },
  actions: {
    async createUserAccount(ctx, createUserAccount){
      try{
        await axios.post(`${ctx.state.API_URL}/api/login/registration`, createUserAccount);            
        ctx.commit('setAccountCreated', "Användarkonto skapat.")
      } catch(error){
        console.error(error)
      }
    },
    async login(ctx, credentials) {
      let resp = await axios.post(`${ctx.state.API_URL}/api/login`, {
        username: credentials.username,
        password: credentials.password
      });
      console.log(resp)
      sessionStorage.setItem('token', resp.data.token);
    },
    async generateUserKey(ctx){
      let resp = await axios.post(`${ctx.state.API_URL}/api/login/userkey`, { user: "admin" }, {
       headers: {
          'authorization': `Bearer ${sessionStorage.getItem('token')}` 
        }
      });
      ctx.commit('setGeneratedKey', resp.data.userKey)
    },
    async getDrafts(ctx){
      let resp = await axios.get(`${ctx.state.API_URL}/api/drafts`);
      const rejectedDrafts = resp.data.filter(item => item.rejected === null);
      ctx.commit('setDrafts', rejectedDrafts.reverse())
    },
    async getRejectedDrafts(ctx){
      let resp = await axios.get(`${ctx.state.API_URL}/api/drafts`);
      const rejectedDrafts = resp.data.filter(item => item.rejected === "rejected");
      ctx.commit('setRejectedDrafts', rejectedDrafts.reverse()) 
    },
    async getOrders(ctx){
      let resp = await axios.get(`${ctx.state.API_URL}/api/orders`);
      ctx.commit('setOrders', resp.data.reverse())
    },
    async getImage(ctx, payload){
      // Template strings with dynamic segment in URL route.
      let resp = await axios.get(`${ctx.state.API_URL}/api/storage/space/${payload.req.filename}`); // ContentType that we get back is a 'application/octet-stream', it's binary data. 
      
      let bufferData = resp.data.Body.data // ArrayBuffer of binary data of image.  

      // Passing encoding type Base64, algorithm that converts binary data into a ASCII string.
      const imageData = new Buffer.from(bufferData).toString("base64") // This string now contains image data that is encoded with Base64.
      // Display image by using <img> tag in HTML. The 'src' attribute should contain Data URL of image. 

      let imageDataURL = `data:image/png;base64,${imageData}` 
      // Data URLs are composed of four parts: a prefix (data:), a MIME type indicating the type of data, an optional base64 token if non-textual, and the data itself.
      
      let imageGrid = document.getElementById(`${payload.req.id}`)
      let img = document.createElement('img');
      imageGrid.appendChild(img);
      img.src = imageDataURL;
      img.alt = payload.req.filename; 
      img.style.maxWidth = "90%";
    },
    async rejectDraft(ctx, payload){
      await axios.patch(`${ctx.state.API_URL}/api/drafts`, { filename: payload.filename, id: payload.id } );
    },
    async removeDraft(ctx, payload){
      await axios.delete(`${ctx.state.API_URL}/api/drafts`, { data: {filename: payload.filename, id: payload.id} } );
    },
    async postSketch(ctx, payload){
      let formData = new FormData();
      formData.append("image", payload); // Construct key/value pairs from form.
      await axios.post(`${ctx.state.API_URL}/api/sketches`, formData); 
    },
    async postDraft(ctx, payload){
      await axios.post(`${ctx.state.API_URL}/api/drafts`, { filename: payload } ); 
    },
    async postOrder(ctx, payload) {
      await axios.post(`${ctx.state.API_URL}/api/orders/`, payload);
    },
    async postMsgToClient(ctx, message) {
      await axios.post(`${ctx.state.API_URL}/api/mailbox/client`, { text: message.text, textId: message.textId, filename: message.filename });
    },
    async postMsgToContacts(ctx, message) {
      await axios.post(`${ctx.state.API_URL}/api/mailbox/contacts`, { text: message.text, textId: message.textId, filename: message.filename }); 
    },
    async getInboxClient(ctx){
      let resp = await axios.get(`${ctx.state.API_URL}/api/mailbox/client`);
      ctx.commit('setInboxClient', resp.data.reverse())
    },
    async getInboxContacts(ctx){
      let resp = await axios.get(`${ctx.state.API_URL}/api/mailbox/contacts`);
      ctx.commit('setInboxContacts', resp.data.reverse())
    }
  },
  modules: {
  }
})