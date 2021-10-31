<template>
  <div id="app">
    <div id="nav">
      <div v-if="navigationBarVisitor" @click="defaultStoreValues">
        <router-link to="/login">Logga in</router-link>
        <span> | </span>
        <router-link to="/register">Registrera</router-link>
      </div>
      <div v-if="role === 'admin'">
        <router-link to="/">Startsida - inloggad</router-link>
        <button @click="logout" class="logout-btn">Logga ut</button>
      </div>
      <div v-if="role === 'client'">
        <router-link to="/client">Startsida - inloggad</router-link>
        <button @click="logout" class="logout-btn">Logga ut</button>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',

  beforeMount(){
  this.$store.dispatch('getDrafts');
  this.$store.dispatch("getRejectedDrafts")
  this.$store.dispatch('getOrders')
  this.$store.dispatch('getMailbox')
  },

  computed: {
  role() {
    return this.$store.state.role
    },
  navigationBarVisitor() {
    return this.$store.state.navigationBarVisitor
    }
  },

  methods: {
  defaultStoreValues() {
  this.$store.dispatch('defaultStoreValues')
  },
  logout() {
  this.$store.dispatch("logout");
  this.$store.state.role = null
  this.$store.state.navigationBarVisitor = true
  }
  },

}
</script>

<style>
body {
  background-color: #F1F1F1; 
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100vh;
}
.back-arrow {
  margin-right: 85%;
  cursor: pointer;
}
h1, h4 {
  color: #2c3e50;
}
#nav {
  padding: 30px;
  background-color: #A9A9A9;
  margin-bottom: 1%;
  border-radius: 5px;
}
#nav a {
  font-weight: bold;
  color: white;
  text-decoration: none;
}
#nav a.router-link-exact-active {
  font-weight: bold;
  font-size: larger;
}
.logout-btn {
  margin-left: 30%;
  border: none;
  height: 30px;
  width: 100px;
  border-radius: 5px;
  background-color:#ff9800;
  color: white;
  cursor: pointer;
}
@media(max-width: 900px) {
    .logout-btn{
        display: block;
        margin-top: 5%;
    }
}
</style>
