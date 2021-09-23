<template>
  <div>
    <h1>Draft</h1>
    <DraftInfo v-for="draft in drafts" :key="draft.created_at" :draft="draft" />
    <br> 
  </div>
</template>

<script>
import DraftInfo from '@/components/DraftInfo'

export default {
  name: 'Home',
  components: {
  DraftInfo
  },
  
  computed: {
  drafts() {
  return this.$store.state.draft;
  },
  },

  beforeMount(){
  this.$store.dispatch("getDraft"); 
  this.$store.dispatch("getDraftImage"); 
  },
  
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>