<template>
  <div class="login-view-wrapper">
    <section>
      <input type="text" name="username" v-model="username" placeholder="Användarnamn" autocomplete="off">
      <input type="password" name="password" v-model="password" placeholder="Lösenord">
      <button @click="login" id="login-btn">Logga in</button>
    </section>
  </div>  
</template>

<script>
export default {
  name: 'Login',

  data(){
  return {
  username: "",
  password: ""
  }
  },

  methods: {
  login(){
  this.$store.dispatch('login', { username: this.username, password: this.password })
  }
  }  
  
}
</script>

<style scoped>
.login-view-wrapper{
  display: flex;
  justify-content: center;
}
section {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  background-color: #fff;
  min-height: 50vh;
  min-width: 30vw;
  padding: 2%;
  border-radius: 5px;
}
input {
  border-top: none;
  border-right: none;
  border-left: none;
  border-bottom: 2px solid #3b5998;
  outline: none;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  padding: 2%;
}
#login-btn {
  border: none;
  height: 40px;
  width: 110px;
  margin-left: 70%;
  border-radius: 5px;
  background-color: #3b5998;
  color: white;
  cursor: pointer;
}
@media(max-width: 900px) {
    section {
      min-width: 70vw;
  }
    #login-btn{
      margin-left: 0%;
    }
}  
</style>