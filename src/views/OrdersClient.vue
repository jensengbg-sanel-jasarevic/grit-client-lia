<template>
  <div class="orders-client-component-wrapper">
    <div>
      <img class="back-arrow" @click="$router.push('/client')" src="@/assets/curved-arrow-220.svg" alt="back" width="50" height="50">
    </div>
    <div>    
    <img src="@/assets/103799.svg" alt="approved" width="50" height="50">
    <h1>Godkända skissförslag</h1>
    <p class="underline">Klicka på <b>"Visa mer"</b> för att se det godkända skissförslaget.</p>
    <Order v-for="order in orders" :key="order.id" :order="order" />
    </div>
  </div>
</template>

<script>
import Order from '@/components/Order'

export default {
  name: 'OrdersClient',
  components: {
  Order
  },
  
  beforeMount(){
  this.$store.dispatch('getOrders')
  this.$store.dispatch('getMailbox')
  this.$store.dispatch("getDrafts");
  this.$store.dispatch('getRejectedDrafts')
  },
  
  computed: {   
  user() {
  return this.$store.state.user;
  },   
  orders() {
  return this.$store.state.orders.filter(item => item.client === this.user);
  }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.orders-client-component-wrapper {
  background-color: #fff;
  padding: 2%;
  border-radius: 5px;
}
.underline {
  border-bottom: 2px solid #42b983;
  padding: 1%;
}
</style>