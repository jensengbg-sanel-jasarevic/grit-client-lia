<template>
  <div>
    <img src="@/assets/103799.svg" alt="approved" width="50" height="50">
    <h1>Godkända skissförslag</h1>
    <p>Klicka på <b>"Visa mer"</b> för att se det godkända skissförslaget.</p>
    <OrdersList v-for="order in orders" :key="order.id" :order="order" />
  </div>
</template>

<script>
import OrdersList from '@/components/OrdersList'

export default {
  name: 'ApprovedClient',
  components: {
  OrdersList
  },
  
  beforeMount(){
  this.$store.dispatch("getOrders")
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