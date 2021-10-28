<template>
  <div id="app">
    <div id="nav">
      <div v-if="navigationBarVisitor" @click="defaultStoreValues">
        <router-link to="/login">Logga in</router-link>
        <span> | </span>
        <router-link to="/register">Registrera</router-link>
      </div>
      <div v-if="role === 'admin'" >
        <router-link to="/">Startsida - inloggad</router-link>
      </div>
      <div v-if="role === 'client'">
        <router-link to="/client">Startsida - inloggad</router-link>
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
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}
#nav a.router-link-exact-active {
  font-weight: bold;
  font-size: larger;
}
</style>
