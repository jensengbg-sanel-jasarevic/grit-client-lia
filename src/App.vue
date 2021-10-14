<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Client |</router-link>
      <router-link to="/contacts">| Contacts </router-link>
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
  this.$store.dispatch('getInboxClient')
  this.$store.dispatch('getInboxContacts')
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
h1, h4 {
  color: #2c3e50;
}
#nav {
  padding: 30px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
