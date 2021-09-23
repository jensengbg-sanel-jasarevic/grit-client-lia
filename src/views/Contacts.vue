<template>
  <div class="wrapper-contacts">   
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
        <p>Click <b>'Show more'</b> to display draft image for each order.</p>
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
.wrapper-contacts {
  margin-left: 5%;
  margin-right: 5%;
  display: grid;
  grid-template-columns: 30% 70%;
  min-height: 500px;
  background-color: #F1F1F1;;
}
h1, p {
  color: #2c3e50;
}
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
button {
  margin-left: 1%;
  margin-top: 1%;
  margin-bottom: 1%;
  border: none;
  border-radius: 5px;
  background-color: #42b983;
  padding: 10px;
  color: white;
  cursor: pointer;
}
.updateSketches > input {
  margin: 5px;
}
</style>