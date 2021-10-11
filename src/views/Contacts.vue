<template>
  <div class="wrapper-contacts">   
        <UploadFile />
        <h1>Ordrar kund</h1>
        <p>Klicka på <b>"Visa mer"</b> för att se det godkända skissförslaget för en viss order.</p>
        <OrdersList 
        v-for="order in orders" :key="order.id" :order="order" />
  </div>
</template>

<script>
import OrdersList from '@/components/OrdersList'
import UploadFile from '@/components/UploadFile'

export default {
  name: 'Contacts',

  components: {
  OrdersList,
  UploadFile
  },

 data() {
    return {
    btnSubmitted: false
    }
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
.wrapper-contacts {
  margin-left: 5%;
  margin-right: 5%;
  display: grid;
  background-color: #F1F1F1;
}
h1, p {
  color: #2c3e50;
}
@media(max-width: 900px) {
    .wrapper-contacts{
        grid-template-columns: 1fr;
    }
}
</style>