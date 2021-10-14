<template>
  <div class="client-component-wrapper">
    <div>
      <h1 v-if="drafts != '' ">Skissförslag</h1>
      <h1 v-else>Det finns för närvarande inga nya skissförslag</h1>
      <DraftInfo v-for="draft in drafts" :key="draft.created_at" :draft="draft" />
    </div>
    <div class="right-column">
      <router-link to="/mailbox-client">
        <h4>Visa mailbox</h4>
        <p class="counter">{{ totalMessages }}</p>
        <img src="@/assets/mail-5886.svg" alt="mailbox" width="50" height="50">
      </router-link>
      <router-link to="/approved-client">
        <h4>Visa godkända</h4>
        <p class="counter">{{ totalOrders }}</p>
        <img src="@/assets/like-922.svg" alt="approved" width="50" height="50">
      </router-link>       
      <router-link to="/rejected-client">
        <h4>Visa underkända</h4>
        <p class="counter">{{ totalRejected }}</p>
        <img src="@/assets/dislike-898.svg" alt="rejected" width="50" height="50">
      </router-link>       
    </div> 
  </div>
</template>

<script>
import DraftInfo from '@/components/DraftInfo'

export default {
  name: 'Client',
  components: {
  DraftInfo
  },
  
  beforeMount(){
  this.$store.dispatch("getDrafts"); 
  },
  
  computed: {
  drafts() {
  return this.$store.state.drafts;
    },
  totalMessages() {
  let total;
  if(this.$store.state.inboxClient != undefined){
    total = this.$store.state.inboxClient.length
  }  
  return total
  },    
  totalOrders() {
  let total;
  if(this.$store.state.orders != undefined){
    total = this.$store.state.orders.length
  }  
  return total  
  },
  totalRejected() {
  let total;
  if(this.$store.state.rejectedDrafts != undefined){
    total = this.$store.state.rejectedDrafts.length
  }  
  return total
  }    
  }
  
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.client-component-wrapper{
  display: grid;
  grid-template-columns: 75% 25%;
  margin-left: 5%;
  margin-right: 5%;
}
.right-column{
  display: flex;
  justify-content: space-between;
}
a {
  text-decoration: none;
}
h4, .counter {
  margin: 0;
  color: #2c3e50;
}
@media(max-width: 900px) {
    .client-component-wrapper{
        grid-template-columns: 1fr;
        grid-row-gap: 10%;
    }
}
</style>