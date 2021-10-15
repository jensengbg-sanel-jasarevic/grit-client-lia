<template>
  <div>
    <div>
      <img class="back-arrow" @click="$router.push('/')" src="@/assets/curved-arrow-220.svg" alt="back" width="50" height="50">
    </div>
    <div>    
    <img src="@/assets/103799.svg" alt="approved" width="50" height="50">
    <h1>Godkända skissförslag</h1>
    <p class="underline">Klicka på <b>"Visa mer"</b> för att se det godkända skissförslaget.</p>
    <OrdersList v-for="order in orders" :key="order.id" :order="order" />
    </div>
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
.underline{
  border-bottom: 2px solid #42b983;
  padding: 1%;
}
</style>