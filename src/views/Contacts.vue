<template>
  <div class="contacts-component-wrapper">  
    <div> 
      <h1>Lägg till bild</h1>
      <p>Välj bild att lägga till som skissförslag till kund.</p>
      <UploadFile />
    </div>
    <div class="right-column">
      <router-link to="/mailbox-contacts">
        <h4>Visa mailbox</h4>
        <img src="@/assets/mail-5886.svg" alt="mailbox" width="50" height="50">
      </router-link>
      <router-link to="/orders-contacts">
        <h4>Visa ordrar</h4>
        <img src="@/assets/list-6240.svg" alt="orderslist" width="50" height="50">
      </router-link>  
    </div>
  </div>
</template>

<script>
import UploadFile from '@/components/UploadFile'

export default {
  name: 'Contacts',

  components: {
  UploadFile
  },
  
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.contacts-component-wrapper {
  display: grid;
  grid-template-columns: 50% 50%;
  margin-left: 5%;
  margin-right: 5%;
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
h4{
  margin: 0;
}
@media(max-width: 900px) {
    .contacts-component-wrapper{
        grid-template-columns: 1fr;
        grid-row-gap: 50%;
    }
}
</style>