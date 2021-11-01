<template>
  <div class="orders-contacts-component-wrapper">
    <div>
      <img class="back-arrow" @click="$router.push('/')" src="@/assets/curved-arrow-220.svg" alt="back" width="50" height="50">
    </div>
    <div> 
      <img src="@/assets/list-6242.svg" alt="orders" width="50" height="50">  
      <h1>Ordrar från kund</h1>
      <p class="underline">Klicka på <b>"Visa mer"</b> för att se det godkända skissförslaget för en viss order.</p>
      <Order v-for="order in orders" :key="order.id" :order="order" />
    </div>
  </div>
</template>

<script>
import Order from '@/components/Order'

export default {
  name: 'OrdersContacts',

  components: {
  Order
  },

  beforeMount(){
  this.$store.dispatch('getOrders')
  this.$store.dispatch('getMailbox')
  },

  computed: {
  orders() {
  return this.$store.state.orders;
  }
  }
  
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.orders-contacts-component-wrapper {
  background-color: #fff;
  padding: 2%;
  border-radius: 5px;
}
.underline {
  border-bottom: 2px solid #42b983;
  padding: 1%;
}
</style>