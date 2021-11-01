<template>
  <div class="inbox-component-wrapper">
    <div>
      <div :id="`${msg.id}`"></div>
      <p><b>Angående: </b>  
        <button @click="getImage" :disabled="disableBtn" class="inbox-img-btn" :id="`btn-inbox-${msg.id}`">draft-ID #{{ msg.draftId }}</button>
      </p>
      <p><b>Avsändare: </b> <span>{{ msg.sender }}</span> </p>
      <p><b>Meddelande:</b></p>
      <p class="inbox-msg-font">{{ msg.message }}</p>
    </div>
    <form @submit.prevent="emitMessage" v-if="msg.sender != 'Grit'">
      <label for="message">
        <textarea id="message" v-model="textareaMessage" rows="5" />
      </label>
      <br>
      <button type="submit" class="inbox-submit-btn">Skicka svar</button>
      <p v-if="textSent">Meddelande skickat.</p>
      <p v-if="textEmpty" class="text-empty">Tomt textfält. Meddelande kunde inte skickas.</p>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Inbox',

  props: {
    msg: Object,
    user: String
  },      

  data() {
    return {
    textareaMessage: "",
    disableBtn: false,
    textSent: false,
    textEmpty: false
    }
  },
  
  methods: {
    getImage() {
    this.$store.dispatch("getImage", { req: this.msg });      
    this.disableBtn = true
    let btn =  document.getElementById(`btn-inbox-${this.msg.id}`)
    btn.style.color = "#2c3e50";
    btn.style.cursor = "initial";
    btn.style.textDecoration = "initial";
    },
    
    emitMessage() {
    if(this.textareaMessage == ""){
    this.textEmpty = true,
    this.textSent = false
    } else {
      this.textEmpty = false
      this.textSent = true
      const message = {
        writer: this.user,
        receiver: this.msg.sender,
        text: this.textareaMessage,
        draftId: this.msg.draftId,
        filename: this.msg.filename
        };
      this.$emit('postMessage', message)      
      this.textareaMessage = ""
      }
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.inbox-component-wrapper{
  display: grid;
  grid-template-columns: 40% 60%;
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
.inbox-img-btn{
  text-decoration: underline;
  color: #42b983;
  cursor: pointer;
}
.inbox-msg-font{
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
.inbox-submit-btn{
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
.text-empty{
  color: #DC143C;
}
@media(max-width: 900px) {
  .inbox-component-wrapper{
    grid-template-columns: 1fr;
    grid-template-areas: none;
    }
  .inbox-submit-btn{
    width: 85%;
  }
}
</style>