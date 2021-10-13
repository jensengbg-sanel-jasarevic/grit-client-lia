<template>
  <div v-if="msg.messages" class="inbox-contacts">
    <div>
      <p><b>Feedback angående: </b> 
        <button @click="getImage" :disabled="disableShowImageMailbox" class="inbox-img-btn" :id="`btn${msg.id}`">draft-ID #{{ msg.messagesId }}</button>
      </p>
      <div :id="`${msg.id}`"></div>
      <p><b>Meddelande:</b></p>
      <p class="inbox-contacts-font">{{ msg.messages }}</p>
    </div>
    <form @submit.prevent="postMessage">
      <label for="contacts-msg">
        <textarea id="contacts-msg" v-model="contactsMessage" rows="5" />
      </label>
      <br>
      <button type="submit" class="submit-msg">Skicka svar</button>
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
    this.$store.dispatch("getImage", { req: this.msg, vueComponent: "InboxContacts.vue" });
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
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.inbox-contacts {
  display: grid;
  grid-template-columns: 40% 60%;
  background-color: #F1F1F1; 
  color: #2c3e50;
  margin-left: 5%;
  margin-right: 5%;
  padding: 1%;
  border-bottom: 1px solid #1d1d1d;
  text-align: left;
}
h4 {
  margin: 0;
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
form {
 display: flex;
 flex-direction: column;
}
textarea{
  width: 90%;
  margin : 0 auto;
  padding: 1%;
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
.submit-msg {
  width: 30%;
  margin-bottom: 1%;
  border: none;
  border-radius: 5px;
  background-color: #42b983;
  padding: 10px;
  color: white;
  cursor: pointer;
  text-align: center;
}
@media(max-width: 900px) {
  .inbox-contacts{
    grid-template-columns: 1fr;
    grid-template-areas: none;
    }
  .submit-msg{
    width: 85%;
  }
}
</style>