<template>
  <div class="contacts">
    <div class="left">
        <h1>Mailbox</h1>
        <InboxContacts v-for="msg in inbox" :key="msg.messages" :msg="msg" />
    </div>
    <div class="right">
        <button @click="postDraft">POST Draft</button>
        <h1>Orders from client</h1>
        <OrdersList 
        v-for="order in orders" :key="order.id" :order="order" />
    </div>
  </div>
</template>

<script>
import OrdersList from '@/components/OrdersList'
import InboxContacts from '@/components/InboxContacts'

export default {
  name: 'Contacts',

  components: {
  OrdersList,
  InboxContacts
  },

  beforeMount(){
  this.$store.dispatch('getInboxContacts')
  this.$store.dispatch("getOrders"); 
  },

  methods: {
    postDraft(){
    this.$store.dispatch('postDraft')
    }
  },

  computed: {
  orders() {
  return this.$store.state.orders;
  },
  inbox() {
  return this.$store.state.inboxContacts;
  }
  }
  
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.contacts {
    display: grid;
    grid-template-columns: 30% 70%;
    }
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