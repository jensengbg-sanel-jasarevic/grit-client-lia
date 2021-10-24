<template>
  <div id="register-component-wrapper">
      <section>
        <input type="text" name="username" v-model="username" placeholder="Användarnamn" autocomplete="off">
        <input type="password" name="password" v-model="password" placeholder="Lösenord">
        <input type="text" name="userkey" v-model="userkey" placeholder="Userkey">
        <a href="#" class="btn" @click.prevent="createUserAccount">Registrera</a>
        <p v-if="accountCreated" id="account-created">{{ accountCreated }}</p>      
      </section>
  </div>
</template>

<script>
export default {
  name: 'Register',
  
  data(){
  return {
  username: '',
  password: '',
  userkey: ""
  }
  },
  
  computed: {
  accountCreated() {
  return this.$store.state.accountCreated;
  }
  },

  methods: {
  createUserAccount(){
  this.$store.dispatch('createUserAccount', { username: this.username, password: this.password, userkey: this.userkey })
  }
  }
}
</script>

<style scoped>
#account-created{
  color: #42b983;
}
</style>