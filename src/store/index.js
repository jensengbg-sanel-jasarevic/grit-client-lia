import Vue from 'vue'
import Vuex from 'vuex'
import router from './../router'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    API_URL: "http://localhost:5000",
    navigationBarVisitor: true,
    user: null,
    role: null,
    generatedKey: null,
    drafts: null,
    rejectedDrafts: null,
    orders: null,
    mailbox: null,
    draftMessage: null,
    registrationMessage: null,
    loginRejectedMessage: null
  },
  mutations: {
    setAuthorizedUser(state, data){
      state.user = data.name
      state.role = data.role
    },
    setLoggedOut(state){
      state.user = null
      state.role = null
    },    
    setGeneratedKey(state, generatedKey){
      state.generatedKey = generatedKey;
    },
    setNavigationBarVisitor(state, value){
      state.navigationBarVisitor = value;
    },    
    setDrafts(state, drafts){
      state.drafts = drafts;
    },
    setRejectedDrafts(state, drafts){
      state.rejectedDrafts = drafts;
    },
    setOrders(state, orders){
      state.orders = orders;
    },
    setMailbox(state, mailbox){
      state.mailbox = mailbox;
    },
    setDraftMessage(state, text){
      state.draftMessage = text;
    },
    setRegistrationMessage(state, text){
      state.registrationMessage = text;
    },    
    setLoginRejectedMessage(state, text){
      state.loginRejectedMessage = text;
    },    
    setDefaultStoreValues(state){
      state.registrationMessage = null;
      state.loginRejectedMessage = null;
      state.generatedKey = null;
    }
  },
  actions: {
    async defaultStoreValues(ctx){
      ctx.commit('setDefaultStoreValues')
    },
    async createUserAccount(ctx, createUserAccount){
      try{
       await axios.post(`${ctx.state.API_URL}/api/registration`, createUserAccount); 
        let accepted = "Användarkonto skapad."    
        ctx.commit('setRegistrationMessage', accepted)
      } catch(error){
        let rejected = "Ogiltig användarnyckel."
        ctx.commit('setRegistrationMessage', rejected)
        console.error(error)
      }
    },
    async login(ctx, credentials) {
      try{
      let resp = await axios.post(`${ctx.state.API_URL}/api/login`, {
        username: credentials.username,
        password: credentials.password
      });
      sessionStorage.setItem('token', resp.data.token);
      let authorizedUser = resp.data 
      ctx.commit('setDefaultStoreValues') 
      ctx.commit("setAuthorizedUser", authorizedUser)
      ctx.commit("setNavigationBarVisitor", false)
      if (authorizedUser.role === "admin"){
      router.push("/")
      } else {
        router.push("/client")
      }
    } catch(error){
      let rejected = "Felaktiga inloggningsuppgifter."
      ctx.commit('setLoginRejectedMessage', rejected)      
      console.error(error)
    }
    },
    async logout(ctx) {
      ctx.commit("setLoggedOut")
      router.push('/login')
    },    
    async generateUserKey(ctx){
      let resp = await axios.post(`${ctx.state.API_URL}/api/keygen`, { user: "admin" }, {
       headers: {
          'authorization': `Bearer ${sessionStorage.getItem('token')}` 
        }
      });
      ctx.commit('setGeneratedKey', resp.data.userkey)
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
      await axios.post(`${ctx.state.API_URL}/api/storage`, formData); 
    },
    async postDraft(ctx, payload){
      try {
        let resp = await axios.post(`${ctx.state.API_URL}/api/drafts`, payload); 
        let accepted = `Förslag skickad till kund: ${resp.data.receiver}`
        ctx.commit('setDraftMessage', accepted)
      } catch(error) {
        let rejected = "Användarkonto finns inte registrerat."
        ctx.commit('setDraftMessage', rejected)
        console.error(error)
      }
    },
    async postOrder(ctx, payload) {
      await axios.post(`${ctx.state.API_URL}/api/orders/`, payload);
    },
    async postMailbox(ctx, message) {
      await axios.post(`${ctx.state.API_URL}/api/mailbox`, { text: message.text, draftId: message.draftId, sender: message.writer, receiver: message.receiver, filename: message.filename }); 
    },
    async getMailbox(ctx){
      let resp = await axios.get(`${ctx.state.API_URL}/api/mailbox`);
      ctx.commit('setMailbox', resp.data.reverse())
    }
  },
  modules: {
  }
})