<template>
  <div>
      <img src="@/assets/list-6242.svg" alt="orders" width="50" height="50">  
      <h1>Ordrar från kund</h1>
      <p>Klicka på <b>"Visa mer"</b> för att se det godkända skissförslaget för en viss order.</p>
      <OrdersList v-for="order in orders" :key="order.id" :order="order" />
  </div>
</template>

<script>
import OrdersList from '@/components/OrdersList'

export default {
  name: 'OrdersContacts',

  components: {
  OrdersList
  },

  beforeMount(){
  this.$store.dispatch("getOrders");
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
</style>