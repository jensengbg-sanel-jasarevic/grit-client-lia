<template>
  <div class="login">

    <section>
      <input type="text" name="username" v-model="username" placeholder="Användarnamn" autocomplete="off">
      <input type="password" name="password" v-model="password" placeholder="Lösenord">
      <a href="#" class="btn" @click.prevent="login">Logga in</a>
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

</style>