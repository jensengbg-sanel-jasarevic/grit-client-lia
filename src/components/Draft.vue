<template>
  <div class="draft-component-wrapper">

    <div class="buttons-right">
      <button id="approve-btn" @click="postOrder" :disabled="disableApproveBtn">{{ approveBtnText }}</button>
      <button id="reject-btn" :disabled="disableRejectBtn" @click="rejectDraft">{{ rejectBtnText }}</button>
    </div>

    <div class="image-box">
      <div :id="draft.id"></div>
      <span><b>Draft-ID</b> #{{ draft.id }}</span>
      <label for="comments">
        <textarea rows="4" placeholder="Lägg till en kommentar" v-model="textareaInput" :disabled="textareaDisabled" />
      </label>
      <button id="leave-comment-btn" @click="postMailbox" :disabled="disableCommentBtn">{{ commentBtnText }}</button>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Draft',

  props: {
    draft: Object,
    user: String
  },

  beforeMount(){
  this.$store.dispatch("getImage", { req: this.draft }) 
  },

 data() {
  return {
  approveBtnText: "Godkänn förslag",
  rejectBtnText: "Underkänn förslag",
  commentBtnText: "Skicka kommentar",
  textareaInput: "",
  textareaDisabled: false,
  disableApproveBtn: false,
  disableRejectBtn: false,
  disableCommentBtn: false    
  }
  },

  methods: {
  postOrder(){
  this.$emit('postOrder', { client: this.user, id: this.draft.id, filename: this.draft.filename }) 
  this.disableApproveBtn = true;
  this.approveBtnText = "Förslag godkänd"
  this.mailDraftAccepted()
  setTimeout( () => { this.$store.dispatch("getDrafts") }, 1500)
  },

  postMailbox() {
    const clientMsg = {
      writer: this.user,
      receiver: this.draft.sender,
      text: this.textareaInput,
      draftId: this.draft.id,
      filename: document.getElementById(this.draft.id).getElementsByTagName('img')[0].alt
    };      
  this.$store.dispatch("postMailbox", clientMsg);
  this.commentBtnText = "Kommentar skickad";
  this.textareaDisabled = true;
  this.disableCommentBtn = true;
  this.commentBtnText = "Kommentar skickad"
  },

  rejectDraft() {
  this.$emit('rejectedDraft', this.draft)        
  this.textareaDisabled = true;
  this.disableRejectBtn = true;
  this.rejectBtnText = "Förslag underkänd"
  this.mailDraftRejected()
  setTimeout( () => { this.$store.dispatch("getDrafts") }, 1500)
  },

  mailDraftAccepted() {
    const msg = {
      writer: "Grit",
      receiver: this.draft.sender,
      text: `Draft (#${this.draft.id}) godkänd av kund (${this.user}). Det här meddelandet skickas automatiskt när ett godkännande av förslag sker.`,
      draftId: this.draft.id,
      filename: document.getElementById(this.draft.id).getElementsByTagName('img')[0].alt
    }         
  this.$store.dispatch("postMailbox", msg);
  },
  
  mailDraftRejected() {
    const msg = {
      writer: "Grit",
      receiver: this.draft.sender,
      text: `Draft (#${this.draft.id}) underkänd av kund (${this.user}). Det här meddelandet skickas automatiskt när ett underkännande av förslag sker.`,
      draftId: this.draft.id,
      filename: document.getElementById(this.draft.id).getElementsByTagName('img')[0].alt
    }         
  this.$store.dispatch("postMailbox", msg);
  },     
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.draft-component-wrapper {
  margin-left: 5%;
  margin-right: 5%;
  display: grid;
  grid-template-columns: 70% 30%;
  grid-template-areas: "left right";
  border-bottom: 1px solid #292929;
}
span {
  color: #2c3e50;
  font-size: 0.8em;
  margin-top: 1%;
}
.buttons-right {
  grid-area: right;
  display: flex;
  flex-direction: column;
}
#approve-btn {
  margin-top: 20%;
  margin-bottom: 10%;
  border: none;
  height: 50px;
  width: auto;
  border-radius: 5px;
  background-color: #42b983;
  color: white;
  cursor: pointer;
}
#reject-btn {
  border: none;
  height: 50px;
  width: auto;
  border-radius: 5px;
  background-color:#DC143C;
  color: white;
  cursor: pointer;
}
.image-box {
  grid-area: left;
  align-items: center;
  display: flex;
  flex-direction: column;
  margin-top: 5%;
}
#leave-comment-btn {
  border: none;
  height: 50px;
  width: 180px;
  border-radius: 5px;
  background-color: #3b5998;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
}  
textarea {
  min-width: 25vw;
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 1.1em;
  border-radius: 8px;
  color: #555555;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 1em;
  line-height: 1.4em;
  outline: none;
  box-shadow: none;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  resize: none;    
  overflow: auto;
}
@media(max-width: 900px) {
  .draft-component-wrapper {
    display: flex;
    flex-direction: column;
    border-top: 1px solid #292929;
  }
  #approve-btn {
    margin-top: 5%;
    margin-bottom: 10%;
  }
}
</style>