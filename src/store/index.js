import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // http://localhost:5000
    // https://nodeserver-100.herokuapp.com
    API_URL: "https://nodeserver-100.herokuapp.com",
    draft: [],
    orders: [],
    inboxContacts: [],
    inboxClient: [],
  },
  mutations: {
    setDrafts(state, drafts){
      state.draft = drafts;
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
    async removeDraft(ctx, id){
      let resp = await axios.delete(`${ctx.state.API_URL}/api/drafts/${id}`);
      console.log(resp)
    },
    async getDraft(ctx){
      let resp = await axios.get(`${ctx.state.API_URL}/api/drafts`);
      ctx.commit('setDrafts', resp.data)
    },
    async getOrders(ctx){
      let resp = await axios.get(`${ctx.state.API_URL}/api/orders`);
      ctx.commit('setOrders', resp.data)
    },
    async getDraftImage(ctx, payload){
      // Template strings with dynamic segment in route.
      let resp = await axios.get(`${ctx.state.API_URL}/api/storage/space/${payload.filename}`); // ContentType that we get back is a 'application/octet-stream', it's binary data. 
      
      let bufferData = resp.data.Body.data // ArrayBuffer of binary data of image.  

      // Passing encoding type Base64, algorithm that converts binary data into a ASCII string.
      const imageData = new Buffer.from(bufferData).toString("base64") // This string now contains image data that is encoded with Base64.
      // Display image by using <img> tag in HTML. The 'src' attribute should contain Data URL of image. 

      let imageDataURL = `data:image/png;base64,${imageData}` 
      // Data URLs are composed of four parts: a prefix (data:), a MIME type indicating the type of data, an optional base64 token if non-textual, and the data itself.

      const imageGrid = document.getElementById(`${payload.id}`)
      const img = document.createElement('img');
      imageGrid.appendChild(img);
      img.src = imageDataURL;
      img.alt = payload.filename; 
      img.style.maxWidth = "90%";
    },
    async getOrderImage(ctx, payload){
      // Template strings with dynamic segment in route.
      let resp = await axios.get(`${ctx.state.API_URL}/api/storage/space/${payload.filename}`); // ContentType that we get back is a 'application/octet-stream', it's binary data. 
      
      let bufferData = resp.data.Body.data // ArrayBuffer of binary data of image.  

      // Passing encoding type Base64, algorithm that converts binary data into a ASCII string.
      const imageData = new Buffer.from(bufferData).toString("base64") // This string now contains image data that is encoded with Base64.
      // Display image by using <img> tag in HTML. The 'src' attribute should contain Data URL of image. 

      let imageDataURL = `data:image/png;base64,${imageData}` 
      // Data URLs are composed of four parts: a prefix (data:), a MIME type indicating the type of data, an optional base64 token if non-textual, and the data itself.

      const imageGrid = document.getElementById(`${payload.id}`)
      const img = document.createElement('img');
      imageGrid.appendChild(img);
      img.src = imageDataURL;
      img.alt = payload.filename; 
      img.style.maxWidth = "90%";
    },
    async postDraft(ctx, payload){
      localStorage.setItem("name", JSON.stringify(payload.name))
      let formData = new FormData();
      formData.append("image", payload); // Construct key/value pairs from form.
      await axios.post(`${ctx.state.API_URL}/api/storage`, formData); 
    },
    async postOrder(ctx, payload) {
      console.log(payload)
      let resp = await axios.post(`${ctx.state.API_URL}/api/orders/`, payload);
      console.log(resp) 
    },
    async postMsgToClient(ctx, message) {
      let resp = await axios.post(`${ctx.state.API_URL}/api/mailbox/client`, { text: message.text, textId: message.textId });
      console.log(resp) 
    },
    async postMsgToContacts(ctx, message) {
      let resp = await axios.post(`${ctx.state.API_URL}/api/mailbox/contacts`, { text: message.text, textId: message.textId });
      console.log(resp) 
    },
    async getInboxClient(ctx){
      let resp = await axios.get(`${ctx.state.API_URL}/api/mailbox/client`);
      ctx.commit('setInboxClient', resp.data)
    },
    async getInboxContacts(ctx){
      let resp = await axios.get(`${ctx.state.API_URL}/api/mailbox/contacts`);
      ctx.commit('setInboxContacts', resp.data)
    }
  },
  modules: {
  }
})