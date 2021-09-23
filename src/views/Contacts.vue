<template>
  <div class="contacts">   
    <div class="left">
        <h1>Mailbox</h1>
        <InboxContacts v-for="msg in inbox" :key="msg.created_at" :msg="msg" />
    </div>
    <div class="right">
        <form @submit.prevent="postDraft" enctype="multipart/form-data">
          <label for="file-uploader">Browse images
            <input type="file" id="file-uploader" accept=".jpg, .png"> 
          </label>
          <button type="submit">Submit</button>   
        </form>
        <h1>Orders from client</h1>
        <OrdersList 
        v-for="order in orders" :key="order.id" :order="order" />
    </div>
  </div>
</template>

<script>
import OrdersList from '@/components/OrdersList'
import InboxContacts from '@/components/InboxContacts'

export default {
  name: 'Contacts',

  components: {
  OrdersList,
  InboxContacts
  },

  beforeMount(){
  this.$store.dispatch('getInboxContacts')
  this.$store.dispatch("getOrders");
  this.$store.dispatch("getOrderImage", { filename: this.orders.filename[1] });  
  },

  methods: {
  postDraft(e){
  this.$store.dispatch('postDraft', e.target[0].files[0])
  }
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
label {
  cursor: pointer;
  border-radius: 5px;
  padding: 10px;
  background-color: #ff9800;
}
input[type="file"] {
  opacity: 0; 
  width: 0;
  height: 0;
}
.contacts {
  display: grid;
  grid-template-columns: 30% 70%;
}
button {
  margin-left: 1%;
  margin-bottom: 1%;
  border: none;
  border-radius: 5px;
  background-color: #42b983;
  padding: 10px;
  color: white;
  cursor: pointer;
}
.deleteBtn {
  background-color: #d11a2a;
}
.updateSketches > input {
  margin: 5px;
}
</style>