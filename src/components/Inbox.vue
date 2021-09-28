<template>
  <div class="mail-client">
      <p><b>Respons från:</b> Contacts</p>
      <p><b>Angående: </b>  
        <button @click="getImage" :disabled="disableShowImageMailbox" class="client-inbox-img-btn" :id="`btn-client-inbox-${msg.id}`">skiss-ID #{{ msg.messagesId }}</button>
      </p>
      <div :id="`inbox-client-${msg.id}`"></div>
      <p><b>Meddelande:</b></p>
      <p class="inbox-client-font">{{ msg.messages }}</p>
    <form @submit.prevent="postMessage">
      <label for="client-msg">
        <textarea id="client-msg" v-model="clientMessage" rows="2" />
      </label>
      <br>
      <button type="submit" class="btn-submit-inbox-client">Skicka svar</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Inbox',

  props: {
      msg: Object
  },      

  data() {
    return {
    clientMessage: "",
    disableShowImageMailbox: false,
    }
  },

  methods: {
    getImage() {
    this.$store.dispatch("getInboxClientImage", { filename: this.msg.filename, id: this.msg.id })
    this.disableShowImageMailbox = true
    let btn =  document.getElementById(`btn-client-inbox-${this.msg.id}`)
    btn.style.cursor = "initial";
    btn.style.textDecoration = "initial";
    },
    async postMessage() {
      const message = {
        text: this.clientMessage,
        textId: this.msg.messagesId,
        filename: this.msg.filename
      };      
      this.$store.dispatch("postMsgToContacts", message);
      this.clientMessage = ""
      },
    
    },  

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mail-client{
  border-bottom: 1px solid white;
}
.btn-submit-inbox-client{
  margin-left: 1%;
  margin-bottom: 1%;
  border: none;
  border-radius: 5px;
  background-color: #42b983;
  padding: 10px;
  color: white;
  cursor: pointer;
}
textarea{
  min-width: 20vw;
  margin : 0 auto;
  padding: 1.1em;
  border-radius: 8px;
  color: #555555;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 1em;
  line-height: 1.4em;
  overflow: auto;
  outline: none;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  resize: none;    
}
h4 {
  margin: 0;
}
button {
  all: unset;
}
.client-inbox-img-btn{
  text-decoration: underline;
  cursor: pointer;
  font-size: 0.8em;
}
.inbox-client-font{
  font-size: 0.8em;
}
</style>
