<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home (Client) </router-link> 
      <router-link to="/mailbox">| Mailbox (Client) |</router-link>       
      <router-link to="/contacts"> Contacts (Admin)</router-link> 
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',

  beforeMount(){
  this.$store.dispatch('getDraft');
  this.$store.dispatch('getOrders')
  this.$store.dispatch('getInboxClient')
  },
  
  computed: {
  drafts() {
  return this.$store.state.draft;
  },
  orders() {
  return this.$store.state.orders;
  }
  
  }

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  background-color: #1d1d1d;
}
h1, h4 {
  color: white;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: white;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
