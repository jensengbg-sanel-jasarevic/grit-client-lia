<template>
  <div>
      <h4>Svar från Contacts för skiss-ID #{{msg.messagesId}}:</h4>
      <p>{{ msg.messages }}</p>
    <form @submit.prevent="postMessage">
      <label for="client-msg">
        <textarea id="client-msg" v-model="clientMessage" rows="2" />
      </label>
      <br>
      <button type="submit">Skicka</button>
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
    clientMessage: ""
    }
  },

  methods: {
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
h4 {
  margin: 0;
}
</style>
