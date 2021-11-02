<template>
  <div class="client-view-wrapper">
    <div>
      <h2 v-if="drafts != '' ">Skissförslag</h2>
      <h2 v-else>Det finns för närvarande inga nya skissförslag att visa</h2>
      
      <Draft
      @rejectedDraft="sendRejectedDraft"
      @postOrder="sendOrder"
      :user="user"
       v-for="draft in drafts" :key="draft.id" :draft="draft" 
       />

    </div>
    <div class="right-column">
      <router-link to="/mailbox-client">
        <h4>Visa mailbox</h4>
        <p class="counter">{{ totalMessages }}</p>
        <img src="@/assets/mail-5886.svg" alt="mailbox" width="50" height="50">
      </router-link>
      <router-link to="/orders-client">
        <h4>Visa godkända</h4>
        <p id="counter-orders" class="counter">{{ totalOrders }}</p>
        <img src="@/assets/like-922.svg" alt="approved" width="50" height="50">
      </router-link>       
      <router-link to="/rejected-client">
        <h4>Visa underkända</h4>
        <p id="counter-rejected" class="counter">{{ totalRejected }}</p>
        <img src="@/assets/dislike-898.svg" alt="rejected" width="50" height="50">
      </router-link>       
    </div> 
  </div>
</template>

<script>
import Draft from '@/components/Draft'

export default {
  name: 'Client',
  components: {
  Draft
  },
  
  beforeMount(){
  this.$store.dispatch("getDrafts");
  this.$store.dispatch('getMailbox')
  this.$store.dispatch('getRejectedDrafts')
  this.$store.dispatch('getOrders')
  },
  
  methods: {
  sendRejectedDraft(payload) {
    this.$store.dispatch("rejectDraft", payload);
    setTimeout( () => {  
    this.$store.dispatch('getRejectedDrafts') 
    let rejectCounter = document.getElementById("counter-rejected")  
    rejectCounter.style.backgroundColor = "#DC143C"
    rejectCounter.style.color = "white"
    rejectCounter.style.borderRadius = "5px"
    }, 1000)
  },
    
  sendOrder(payload) {
    this.$store.dispatch('postOrder', payload)
    this.$store.dispatch("removeDraft", payload);
    setTimeout( () => {  
    this.$store.dispatch('getOrders') 
    let orderCounter = document.getElementById("counter-orders")
    orderCounter.style.backgroundColor = "#42b983"
    orderCounter.style.color = "white"
    orderCounter.style.borderRadius = "5px"
    }, 1000)
  }
  },

  computed: {
  user() {
  return this.$store.state.user;
  },    
  drafts() {
  return this.$store.state.drafts
  },
  totalMessages() {
  let total;
  let mailbox = this.$store.state.mailbox
  if(mailbox != undefined){
    total = mailbox.length
  }  
  return total
  },  
  totalOrders() {
  let total;
  let orders = this.$store.state.orders
  if(orders != undefined){
    total = orders.length
  }  
  return total  
  },
  totalRejected() {
  let total;
  let rejectedDrafts = this.$store.state.rejectedDrafts
  if(rejectedDrafts != undefined){
    total = rejectedDrafts.length
  }  
  return total
  }    
  }
  
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.client-view-wrapper{
  display: grid;
  grid-template-columns: 75% 25%;
  margin-left: 5%;
  margin-right: 5%;
  background-color: #fff;
  padding: 2%;
  border-radius: 5px;
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
    .client-view-wrapper{
        grid-template-columns: 1fr;
    }
}
</style>