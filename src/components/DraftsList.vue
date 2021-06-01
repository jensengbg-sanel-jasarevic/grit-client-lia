<template>
  <div>
    <span class="bold">ID: </span>
    <span> {{ draft.id }} </span>
    <span class="bold">message: </span>
    <span>{{ draft.message }} </span>
    <span class="bold">comment: </span>
    <span>{{ draft.comment }} </span>
    <span class="bold">created at: </span>
    <span>{{ draft.created_at }} </span>
    <span class="bold">updated at: </span>
    <span>{{ draft.updated_at }}</span>
    <form @submit.prevent="postComment">
      <label for="comments">
        <textarea v-model="textareaInput" rows="4" />
      </label>
      <br>
      <button type="submit">Leave comment</button>
    </form>
      <button @click="postOrder">Confirm order</button> 
  </div>
</template>

<script>
export default {
  name: 'DraftsList',

  props: {
      draft: Object
  },

  data() {
    return {
    textareaInput: "",
    };
  },

  methods: {
    async postComment() {
      const comment = {
        text: this.textareaInput,
        id: this.draft.id,
      };      
      this.$store.dispatch("postComment", comment);
      this.$store.dispatch("getDrafts");
      this.textareaInput = "";    
      },
    
    postOrder(){
    this.$store.dispatch('postOrder', this.draft.id)
    }
    },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
span {
  font-size: 0.8em;
}
.bold {
  font-weight: bold;
}
.changes {
  color: red;
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
  min-width: 25vw;
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
</style>
