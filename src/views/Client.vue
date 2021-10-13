<template>
  <div>
    <h1 v-if="drafts != ''">Skissförslag</h1>
    <h1 v-else>Det finns för närvarande inga nya skissförslag.</h1>
    <DraftInfo v-for="draft in drafts" :key="draft.created_at" :draft="draft" />
    <br> 
  </div>
</template>

<script>
import DraftInfo from '@/components/DraftInfo'

export default {
  name: 'Client',
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