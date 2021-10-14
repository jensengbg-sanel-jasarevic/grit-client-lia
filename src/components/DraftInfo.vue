<template>
  <div class="draft-info-component-wrapper">
    <button id="approve-btn" @click="postOrder" :disabled="disableApproveBtn">{{ approveBtnText }}</button>

    <div class="image-box">
      <h3>Draft-ID #{{draft.id}}</h3>
      <div :id="draft.id"></div>
      <span><b>message:</b> {{ draft.message }}</span>
      <span><b>created at:</b> {{ draft.created_at }}</span>
      <button id="reject-btn" :disabled="disableRejectBtn" @click="rejectDraft">{{ disapproveBtnText }}</button>
      <label for="comments">
        <textarea rows="4" placeholder="Lägg till en kommentar" v-model="textareaInput" :disabled="textareaDisabled" />
      </label>
      <button id="disapprove-btn" @click="postMsgToContacts" :disabled="disableCommentBtn">{{ commentBtnText }}</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DraftInfo',

  props: {
    draft: Object
  },

  mounted() {
    this.$nextTick(function () {
      this.$store.dispatch("getImage", { req: this.draft, vueComponent: "DraftInfo.vue" }); 
    })
  },

 data() {
    return {
    approveBtnText: "Godkänn förslag",
    disapproveBtnText: "Underkänn förslag",
    commentBtnText: "Skicka kommentar",
    textareaInput: "",
    textareaDisabled: false,
    disableApproveBtn: false,
    disableRejectBtn: false,
    disableCommentBtn: false    
    };
  },

  methods: {
    postOrder(){
    this.$store.dispatch('postOrder', { id: this.draft.id, filename: this.draft.filename } )
    this.$store.dispatch("removeDraft", this.draft);
    this.disableApproveBtn = true;
    this.approveBtnText = "Förslag godkänd"
    setTimeout( () => { this.$store.dispatch("getDrafts") }, 1500)
   },

    postMsgToContacts() {
    const clientMsg = {
      text: this.textareaInput,
      textId: this.draft.id,
      filename: document.getElementById(this.draft.id).getElementsByTagName('img')[0].alt
    };      
    this.$store.dispatch("postMsgToContacts", clientMsg);
    this.commentBtnText = "Kommentar skickad";
    this.textareaDisabled = true;
    this.disableCommentBtn = true;
    this.commentBtnText = "Kommentar skickad"
    },

    rejectDraft() {
    this.$store.dispatch("rejectDraft", this.draft);
    this.textareaDisabled = true;
    this.disableRejectBtn = true;
    this.disapproveBtnText = "Förslag underkänd"
    setTimeout( () => { this.$store.dispatch("getDrafts") }, 1500)
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.draft-info-component-wrapper {
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
h3 {
  color: #2c3e50;
}
#approve-btn {
  grid-area: right;
  margin-top: 50%;
  margin-right: 10%;
  border: none;
  height: 50px;
  width: auto;
  border-radius: 5px;
  background-color: #42b983;
  color: white;
  cursor: pointer;
}
.image-box {
  grid-area: left;
  align-items: center;
  display: flex;
  flex-direction: column;
}
#disapprove-btn {
  border: none;
  height: 50px;
  width: 180px;
  border-radius: 5px;
  background-color: #3b5998;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
}  
#reject-btn {
  margin-top: 1%;
  border: none;
  height: 40px;
  width: 130px;
  border-radius: 5px;
  background-color:#DC143C;
  color: white;
  cursor: pointer;
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
</style>
