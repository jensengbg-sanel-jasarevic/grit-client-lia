<template>
  <div class="register-view-wrapper">
      <section>
        <input type="text" name="username" v-model="username" placeholder="Användarnamn" autocomplete="off">
        <input type="password" name="password" v-model="password" placeholder="Lösenord">
        <input type="text" name="userkey" v-model="userkey" placeholder="Användarnyckel">
        <button @click="createUserAccount" id="register-btn">Registrera</button>
        <p class="rejected">{{ textInputUnfilled }}</p>
        <p v-if="registrationAccepted" class="accepted">{{ registrationAccepted }}</p> 
        <p v-if="registrationRejected" class="rejected">{{ registrationRejected }}</p>     
      </section>
  </div>
</template>

<script>
export default {
  name: 'Register',
  
  data(){
  return {
  username: null,
  password: null,
  userkey: null,
  textInputUnfilled: null
  }
  },
  
  computed: {
  registrationAccepted() {
  return this.$store.state.registrationAccepted;
  },
  registrationRejected() {
  return this.$store.state.registrationRejected;
  }
  },

  methods: {
  createUserAccount(){
      if (this.username && this.password && this.userkey != "") {
          this.$store.dispatch('createUserAccount', { username: this.username, password: this.password, userkey: this.userkey })
          this.textInputUnfilled = ""
      } else {
          this.textInputUnfilled = "Alla fält behöver fyllas i för att skapa ett konto."
      }
    }
  }

}
</script>

<style scoped>
.register-view-wrapper{
  display: flex;
  justify-content: center;
}
p {
  font-size: 0.8em;
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
#register-btn {
  border: none;
  height: 40px;
  width: 110px;
  margin-left: 70%;
  border-radius: 5px;
  background-color: #3b5998;
  color: white;
  cursor: pointer;
}
.accepted {
  color: #42b983;
}
.rejected {
  color: #DC143C;
}
@media(max-width: 900px) {
    section {
      min-width: 70vw;
  }
    #register-btn{
      margin-left: 0%;
    }
} 
</style>