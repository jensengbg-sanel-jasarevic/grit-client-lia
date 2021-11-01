<template>
  <div class="rejected-client-component-wrapper">
    <div>
      <img class="back-arrow" @click="$router.push('/client')" src="@/assets/curved-arrow-220.svg" alt="back" width="50" height="50">
    </div>
    <div> 
      <img src="@/assets/10379.svg" alt="rejected" width="50" height="50">
      <h1 class="underline">Underkända skissförslag</h1>
      <DraftRejected 
      v-for="draft in rejectedDrafts" :key="draft.id" :draft="draft"
      :user="user" />
    </div>
  </div>
</template>

<script>
import DraftRejected from '@/components/DraftRejected'

export default {
  name: 'RejectedClient',
  
  components: {
  DraftRejected
  },
  
  beforeMount(){
  this.$store.dispatch('getRejectedDrafts')
  this.$store.dispatch("getDrafts");
  this.$store.dispatch('getMailbox')
  this.$store.dispatch('getOrders')
  },
  
  computed: {
  user() {
  return this.$store.state.user;
  },       
  rejectedDrafts() {
  let rejectedList = this.$store.state.rejectedDrafts
  let rejectedUser = rejectedList.filter(item => item.receiver === this.user && item.rejected === "rejected");
  return rejectedUser;
  }     
  }

}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.rejected-client-component-wrapper {
  background-color: #fff;
  padding: 2%;
  border-radius: 5px;
}
.underline{
  border-bottom: 2px solid #DC143C;
  padding: 1%;
}
</style>