<template>
  <div v-if="msg.messages" class="inbox-contacts">
    <h4>Kommentar från kund för skiss-ID #{{ msg.messagesId }}:</h4>
    <p>{{ msg.messages }}</p>

    <form @submit.prevent="postMessage">
      <label for="contacts-msg">
        <textarea id="contacts-msg" v-model="contactsMessage" rows="2" />
      </label>
      <br>
      <button type="submit">Skicka</button>
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
    contactsMessage: ""
    }
  },

  methods: {
    async postMessage() {
      const message = {
        text: this.contactsMessage,
        textId: this.msg.messagesId
      };      
      this.$store.dispatch("postMsgToClient", message);
      this.contactsMessage = ""
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
button {
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
</style>
