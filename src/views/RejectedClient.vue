<template>
  <div>
    <div>
      <img class="back-arrow" @click="$router.push('/client')" src="@/assets/curved-arrow-220.svg" alt="back" width="50" height="50">
    </div>
    <div> 
      <img src="@/assets/10379.svg" alt="rejected" width="50" height="50">
      <h1 class="underline">Underkända skissförslag</h1>
      <RejectedDraft v-for="draft in rejectedDrafts" :key="draft.created_at" :draft="draft" />
    </div>
  </div>
</template>

<script>
import RejectedDraft from '@/components/RejectedDraft'

export default {
  name: 'RejectedClient',
  
  components: {
  RejectedDraft
  },
  
  beforeMount(){
  this.$store.dispatch("getRejectedDrafts")
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
.underline{
  border-bottom: 2px solid #DC143C;
  padding: 1%;
}
</style>