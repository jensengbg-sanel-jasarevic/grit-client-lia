<template>
  <div>
    <h1>Draft</h1>
    <DraftsList
     v-for="draft in drafts" :key="draft.message" :draft="draft" />
    <br> 
  </div>
</template>

<script>
import DraftsList from '@/components/DraftsList'

export default {
  name: 'Home',
  components: {
  DraftsList
  },

  beforeMount(){
  this.$store.dispatch("getDrafts"); 
  },
  
  computed: {
  drafts() {
  return this.$store.state.drafts;
  },

  }

}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>