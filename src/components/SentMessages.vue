<template>
  <div class="sent-messages-component-wrapper">
      <div :id="`${msg.id}`"></div>
      <p><b>Angående: </b>  
        <button @click="getImage" :disabled="disableBtn" class="sent-msg-img-btn" :id="`btn-sent-msg-${msg.id}`">draft-ID #{{ msg.draftId }}</button>
      </p>
      <p><b>Meddelandemottagare: </b>{{ msg.receiver }}</p>
      <p><b>Meddelande skickat:</b></p>
      <p>{{ msg.message }}</p>
  </div>
</template>

<script>
export default {
  name: 'SentMessages',

  props: {
    msg: Object
  },      

  data() {
    return {
    disableBtn: false
    }
  },

methods: {
  getImage() {
  this.$store.dispatch("getImage", { req: this.msg });      
  this.disableBtn = true
  let btn = document.getElementById(`btn-sent-msg-${this.msg.id}`)
  btn.style.color = "white";
  btn.style.cursor = "initial";
  btn.style.textDecoration = "initial";
  },
}

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.sent-messages-component-wrapper {
  background-color: #777;
  color: white;
  border-radius: 5px;
  margin-bottom: 5%;
  padding: 2%;
}
p{
  text-align: left;
}
.sent-msg-img-btn{
  all: unset;
  background-color: #777;
  text-decoration: underline;
  color: #42b983;
  cursor: pointer;
}
</style>