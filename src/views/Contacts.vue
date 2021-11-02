<template>
  <div v-if="role === 'admin'" class="contacts-component-wrapper">  
    <div> 
      <h1>Lägg till ny skissförslag</h1>
      <p>Välj bild att lägga till som skissförslag till kund.</p>
      <UploadFile :user="user" />
      <KeyGenerator />
    </div>
    <div class="right-column" @click="defaultStoreValues">
      <router-link to="/mailbox-contacts">
        <h4>Visa mailbox</h4>
        <p class="counter">{{ totalMessages }}</p>
        <img src="@/assets/mail-5886.svg" alt="mailbox" width="50" height="50">
      </router-link>
      <router-link to="/orders-contacts">
        <h4>Visa ordrar</h4>
        <p class="counter">{{ totalOrders }}</p>
        <img src="@/assets/list-6240.svg" alt="orders" width="50" height="50">
      </router-link>  
    </div>
  </div>
</template>

<script>
import UploadFile from '@/components/UploadFile'
import KeyGenerator from '@/components/KeyGenerator'

export default {
  name: 'Contacts',

  components: {
  UploadFile,
  KeyGenerator
  },
  
  beforeMount(){
  this.$store.dispatch('getMailbox')
  this.$store.dispatch('getOrders')
  },

  computed: {
  user() {
  return this.$store.state.user;
  },
  role() {
  return this.$store.state.role;    
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
    if(this.$store.state.orders != undefined){
    total = this.$store.state.orders.length
    }
  return total
  }    
  },

  methods: {
  defaultStoreValues() {
  this.$store.dispatch('defaultStoreValues')
    }    
  }  
  
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.contacts-component-wrapper {
  display: grid;
  grid-template-columns: 50% 50%;
  margin-left: 5%;
  margin-right: 5%;
  min-height: 70vh;
  background-color: #fff;
  padding: 2%;
  border-radius: 5px;
}
.right-column{
  display: flex;
  justify-content: space-evenly;
}
h1, p, a {
  color: #2c3e50;
}
a{
  text-decoration: none;
}
h4, .counter {
  margin: 0;
}
@media(max-width: 900px) {
    .contacts-component-wrapper{
        grid-template-columns: 1fr;
        grid-row-gap: 50%;
    }
}
</style>