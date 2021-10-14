<template>
    <div>
      <img src="@/assets/10379.svg" alt="rejected" width="50" height="50">
      <h1>Underkända skissförslag</h1>
      <RejectedDraft v-for="draft in rejectedDrafts" :key="draft.created_at" :draft="draft" />
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
  rejectedDrafts() {
  return this.$store.state.rejectedDrafts;
  }     
  }

}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>