<template>
  <div class="wrapper-contacts">   
    <div class="left">
        <h1>Mailbox contacts</h1>
        <InboxContacts v-for="msg in inbox" :key="msg.created_at" :msg="msg" />
    </div>
    <div class="right">
        <form @submit.prevent="postDraft" enctype="multipart/form-data">
          <label for="file-uploader">Bläddra
            <input type="file" id="file-uploader" accept=".jpg, .png"> 
          </label>
          <button id="submit-img-btn" type="submit">Lämna in bild</button>  
          <p class="uploaded-img-text"  v-if="btnSubmitted">Bilduppladdning klar. <a href="http://localhost:8080/">Klicka här</a> för att se senaste uppladdningen.</p> 
        </form>
        <h1>Kundens ordrar</h1>
        <p>Klicka på <b>"Visa mer"</b> för att se skissbilden för en viss order.</p>
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

 data() {
    return {
    btnSubmitted: false
    }
  },

  beforeMount(){
  this.$store.dispatch('getInboxContacts')
  this.$store.dispatch("getOrders");
  },

  methods: {
  postDraft(e){
  this.$store.dispatch('postDraft', e.target[0].files[0])
  this.btnSubmitted = true
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
a{
  font-weight: bold;
  text-decoration: none;
  font-size: 1.3em;
  color:#ff9800; 
}
.uploaded-img-text{
  font-weight: bold;
  color: #42b983;
}
label {
  margin-top: 1%;
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

@media(max-width: 900px) {
    .wrapper-contacts{
        grid-template-columns: 1fr;
    }
}
</style>