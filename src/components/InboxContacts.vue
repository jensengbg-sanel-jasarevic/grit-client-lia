<template>
  <div v-if="msg.messages" class="inbox-contacts">
    <p><b>Feedback angående: </b> 
      <button @click="getImage" :disabled="disableShowImageMailbox" class="inbox-img-btn" :id="`btn${msg.id}`">skiss-ID #{{ msg.messagesId }}</button>
    </p>
    <div :id="`inbox-contacts-${msg.id}`"></div>
    <p><b>Meddelande:</b></p>
    <p class="inbox-contacts-font">{{ msg.messages }}</p>
    <form @submit.prevent="postMessage">
      <label for="contacts-msg">
        <textarea id="contacts-msg" v-model="contactsMessage" rows="2" />
      </label>
      <br>
      <button class="submit-msg" type="submit">Skicka svar</button>
      <p v-if="messageSent">Meddelande skickat.</p>
    </form>
  </div>
</template>

<script>

export default {
  name: 'InboxContacts',

  props: {
      msg: Object
  },      

  data() {
    return {
    contactsMessage: "",
    disableShowImageMailbox: false,
    messageSent: false,
    }
  },

  methods: {
    getImage() {
    this.$store.dispatch("getInboxContactsImage", { filename: this.msg.filename, id: this.msg.id })
    this.disableShowImageMailbox = true
    let btn =  document.getElementById(`btn${this.msg.id}`)
    btn.style.color = "#2c3e50";
    btn.style.cursor = "initial";
    btn.style.textDecoration = "initial"
    },
    async postMessage() {
      const message = {
        text: this.contactsMessage,
        textId: this.msg.messagesId,
        filename: this.msg.filename
      };      
      this.$store.dispatch("postMsgToClient", message);
      this.contactsMessage = ""
      this.messageSent = true
      },
    
    },  

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.inbox-contacts {
  border-bottom: 1px solid #292929;
  margin-bottom: 5%;
}
.submit-msg {
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
  min-width: 15vw;
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
h4, p {
  color: #2c3e50;
}
h4 {
  margin: 0;
}
p { 
  word-break: break-all;
  }
  button {
   all: unset;
}
.inbox-img-btn {
  text-decoration: underline;
  color: #42b983;
  cursor: pointer;
}
.inbox-contacts-font{
  font-size: 0.8em;
}
</style>
