<template>
  <div class="home">
    <button @click="postSketchDraft">POST Draft</button>

    <h1>Inbox</h1>
      <Inbox v-for="msg in inbox" :key="msg" :msg="msg" />

    <h1>Orders</h1>
    <OrdersList 
    v-for="order in orders" :key="order.message" :order="order" />

  </div>
</template>

<script>
import OrdersList from '@/components/OrdersList'
import Inbox from '@/components/Inbox'

export default {
  name: 'Admin',

  components: {
  OrdersList,
  Inbox
  },

  beforeMount(){
  this.$store.dispatch('getInbox')
  },

  methods: {
    postSketchDraft(){
    this.$store.dispatch('postSketchDraft')
    this.$store.dispatch("getDrafts"); 
    },
    refreshInbox(){
    this.$store.dispatch('getInbox')
    }
  },

  computed: {
  drafts() {
  return this.$store.state.drafts;
  },
  orders() {
  return this.$store.state.orders;
  },
  inbox() {
  return this.$store.state.inbox;
  }
  }

  
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
.deleteBtn {
  background-color: #d11a2a;
}
.patchBtn {
  background-color: #ff9800;
}
.updateSketches > input {
  margin: 5px;
}
</style>