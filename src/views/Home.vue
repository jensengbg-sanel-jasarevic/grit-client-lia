<template>
  <div>
    <h1>Drafts</h1>
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