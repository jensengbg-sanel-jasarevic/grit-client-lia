import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'
import router from './../router'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState({
    storage: window.localStorage,
})],

  state: {
    // https://nodeserver-100.herokuapp.com
    API_URL: "https://nodeserver-100.herokuapp.com",
    navigationBarVisitor: true,
    active: false,
    user: null,
    role: null,
    token: null,
    generatedKey: null,
    drafts: null,
    rejectedDrafts: null,
    orders: null,
    mailbox: null,
    sent: null,
    draftMessage: null,
    registrationMessage: null,
    loginRejectedMessage: null
  },
  mutations: {
    setAuthorizedUser(state, data){
      state.user = data.name
      state.role = data.role
      state.token = data.token
    },
    setLoggedOut(state){
      state.navigationBarVisitor = true
      state.active = false
      state.user = null
      state.role = null
      state.token = null
      state.generatedKey = null
      state.drafts = null
      state.rejectedDrafts = null
      state.orders = null
      state.mailbox = null
      state.sent = null
      state.draftMessage = null
      state.registrationMessage = null
      state.loginRejectedMessage = null
    },
    setUserActive(state, value){
      state.active = value
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
    setSentMessages(state, messages){
      state.sent = messages
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
      let authorizedUser = resp.data 
      ctx.commit('setDefaultStoreValues') 
      ctx.commit("setAuthorizedUser", authorizedUser)
      ctx.commit('setUserActive', true)
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
      await axios.patch(`${ctx.state.API_URL}/api/user`, { user: ctx.state.user })
      ctx.commit("setLoggedOut")
      router.push('/login')
    },
    async verifyActiveUser(ctx) {
      let resp = await axios.get(`${ctx.state.API_URL}/api/user/${ctx.state.user}`)
      if(resp.data[0].active === 0){
        ctx.commit("setLoggedOut")
        router.push('/login')
      }
      return
   },     
    async generateUserKey(ctx){
      let resp = await axios.post(`${ctx.state.API_URL}/api/keygen`, { user: "admin" }, {
       headers: {
          'authorization': `Bearer ${ctx.state.token}` 
        }
      });
      ctx.commit('setGeneratedKey', resp.data.userkey)
    },
    async getDrafts(ctx){
      if(ctx.state.role === null){
        return
      } else {
      let resp = await axios.get(`${ctx.state.API_URL}/api/drafts`);
      let drafts = resp.data.filter(item => item.rejected === null);
      let draftsUser = drafts.filter(item => item.receiver === ctx.state.user)
      ctx.commit('setDrafts', draftsUser.reverse())
      }
    },
    async getRejectedDrafts(ctx){
      let resp = await axios.get(`${ctx.state.API_URL}/api/drafts`);
      let rejectedDrafts = resp.data.filter(item => item.rejected === "rejected");
      let rejectedDraftsUser = rejectedDrafts.filter(item => item.receiver === ctx.state.user);
      ctx.commit('setRejectedDrafts', rejectedDraftsUser.reverse()) 
    },
    async getOrders(ctx){
      if(ctx.state.role === null) {
        return
      } else {
        let resp = await axios.get(`${ctx.state.API_URL}/api/orders`)

        if(ctx.state.role === "admin") {
          ctx.commit('setOrders', resp.data.reverse())
        }

        if (ctx.state.role === "client"){
          let userOrders = resp.data.filter(item => item.client === ctx.state.user);
          ctx.commit('setOrders', userOrders.reverse())
        }      

      }
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
      let downloadLink = document.createElement("a")
      imageGrid.appendChild(img);
      imageGrid.appendChild(downloadLink)

      img.src = imageDataURL;
      img.alt = payload.req.filename; 
      img.style.maxWidth = "90%";

      downloadLink.style.display = "block"
      downloadLink.style.textDecoration = "none"
      downloadLink.style.color = "#ff9800"
      downloadLink.innerText = "Ladda ner fullstorlek"
      downloadLink.href = imageDataURL;
      downloadLink.download = payload.req.filename;
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
      await axios.post(`${ctx.state.API_URL}/api/orders/`, payload, {
        headers: {
           'authorization': `Bearer ${ctx.state.token}` 
         }
       }); 
    },
    async postMailbox(ctx, message) {
      await axios.post(`${ctx.state.API_URL}/api/mailbox`, { text: message.text, draftId: message.draftId, sender: message.writer, receiver: message.receiver, filename: message.filename }, {
        headers: {
           'authorization': `Bearer ${ctx.state.token}` 
         }
       }); 
    },
    async getMailbox(ctx){
      if(ctx.state.role === null) {
        return
      } else {
        let resp = await axios.get(`${ctx.state.API_URL}/api/mailbox`); 

        if (ctx.state.role === "admin"){
          let userMailbox = resp.data.filter(msg => msg.receiver === ctx.state.user);
          let sentMessages = resp.data.filter(msg => msg.sender === ctx.state.user);
          ctx.commit('setMailbox', userMailbox.reverse())
          ctx.commit('setSentMessages', sentMessages.reverse())
        }

        if (ctx.state.role === "client"){
          let userMailbox = resp.data.filter(msg => msg.receiver === ctx.state.user);
          ctx.commit('setMailbox', userMailbox.reverse())
        }        
      }
      
    },

  },
  modules: {
  }
})