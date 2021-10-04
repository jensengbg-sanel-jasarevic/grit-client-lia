<template>
  <div class="wrapper-contacts">   
    <div class="left">
        <h1>Mailbox contacts</h1>
        <p>Kommentarer från kund för underkända skissar.</p>
        <p class="show-sketch-text">Klicka på det specifika skiss-ID som finns tillgänglig under varje meddelanderuta för att se skissbild som underkänts.</p>
        <InboxContacts v-for="msg in inbox" :key="msg.created_at" :msg="msg" />
    </div>
    <div class="right">
        <UploadFile />
        <h1>Ordrar kund</h1>
        <p>Klicka på <b>"Visa mer"</b> för att se skissbild för en viss order.</p>
        <OrdersList 
        v-for="order in orders" :key="order.id" :order="order" />
    </div>
  </div>
</template>

<script>
import OrdersList from '@/components/OrdersList'
import InboxContacts from '@/components/InboxContacts'
import UploadFile from '@/components/UploadFile'

export default {
  name: 'Contacts',

  components: {
  OrdersList,
  InboxContacts,
  UploadFile
  },

 data() {
    return {
    btnSubmitted: false
    }
  },

  beforeMount(){
  this.$store.dispatch('getInboxContacts')
  this.$store.dispatch("getOrders");
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
.wrapper-contacts {
  margin-left: 5%;
  margin-right: 5%;
  display: grid;
  grid-template-columns: 30% 70%;
  min-height: 500px;
  background-color: #F1F1F1;;
}
h1, p {
  color: #2c3e50;
}
.show-sketch-text {
    padding: 2%;
    border-bottom: 1px solid #292929;
}

@media(max-width: 900px) {
    .wrapper-contacts{
        grid-template-columns: 1fr;
    }
}
</style>