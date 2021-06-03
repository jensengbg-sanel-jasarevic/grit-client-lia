<template>
  <div>
      <span><b>Draft ID: </b>{{ msg.id }}, <b>Comments: </b>{{ msg.comment }}</span>
    <form @submit.prevent="postResponse">
      <label for="admin-msg">
        <textarea id="comment" v-model="adminResponse" rows="2" />
      </label>
      <br>
      <button type="submit">Post answer</button>
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
    adminResponse: ""
    }
  },

  methods: {
    async postResponse() {
      const response = {
        text: this.adminResponse,
      };      
      this.$store.dispatch("postAdminResponse", response);
      this.adminResponse = ""
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
</style>
