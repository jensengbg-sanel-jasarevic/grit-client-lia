<template>
  <div class="wrapper-draft">

    <button id="approve-btn" @click="postOrder" :disabled="disableApproveBtn">{{ approveBtnText }}</button>

    <div class="disapprove-comments">
      <h3>Skiss förslag</h3>

      <div id="draft-img"></div>

      <span class="bold">ID: </span>
      <span> {{ draft.id }} </span>
      <span class="bold">message: </span>
      <span>{{ draft.message }} </span>
      <span class="bold">created at: </span>
      <span>{{ draft.created_at }} </span>
      <span class="bold">updated at: </span>
      <span>{{ draft.updated_at }}</span>

      <button id="disapprove-btn" @click.prevent="postMsgToContacts" :disabled="disableDisapproveBtn">{{ disapproveBtnText }}</button>

      <label for="comments">
        <textarea id="comments" rows="4" :placeholder="textareaPlaceholder" v-model="textareaInput" :disabled="textareaDisabled" />
      </label>
    </div>

  </div>
</template>

<script>
export default {
  name: 'DraftInfo',

 data() {
    return {
    textareaInput: "",
    textareaDisabled: false,
    disableApproveBtn: false,
    disableDisapproveBtn: false,
    approveBtnText: "Godkänn",
    disapproveBtnText: "Underkänn",
    textareaPlaceholder: "Lägg till en kommentar"
    };
  },

  methods: {
    async postMsgToContacts() {
      const clientMsg = {
        text: this.textareaInput,
        textId: this.draft.id,
      };      
      this.$store.dispatch("postMsgToContacts", clientMsg);
      this.textareaDisabled = true;
      this.disableDisapproveBtn = true;
      this.disapproveBtnText = "Skiss underkänd"
      this.$store.dispatch("getDraft");
      },

    postOrder(){
    this.$store.dispatch('postOrder', this.draft.id)
    this.disableApproveBtn = true;
    this.approveBtnText = "Skiss godkänd"
   }
  },

  computed: {
  draft() {
  return this.$store.state.draft;
  },
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
span {
  color: #2c3e50;
  font-size: 0.8em;
  margin-top: 1%;
}
.bold {
  font-weight: bold;
}
h3 {
    color: #2c3e50;
}
.wrapper-draft {
  margin-left: 5%;
  margin-right: 5%;
  display: grid;
  grid-template-columns: 70% 30%;
  grid-template-areas: "left right";
  min-height: 500px;
  background-color: #F1F1F1;
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
.disapprove-comments {
  grid-area: left;
  align-items: center;
  display: flex;
  flex-direction: column;
}
#disapprove-btn {
  margin-top: 1%;
  border: none;
  height: 50px;
  width: 180px;
  border-radius: 5px;
  background-color: #DC143C;
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
#comments {
  max-width: 150px;
}
</style>
