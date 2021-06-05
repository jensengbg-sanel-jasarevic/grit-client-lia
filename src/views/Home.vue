<template>
  <div class="home">
    <h1>Drafts</h1>
    <DraftsList
    @submit.native="refreshDraftData"
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

  methods: {
    refreshDraftData(){
    this.$store.dispatch("getDrafts");
    }
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
button {
  margin-left: 1%;
  margin-bottom: 1%;
  border: none;
  border-radius: 5px;
  background-color: #42b983;
  padding: 10px;
  color: white;
  cursor: pointer;
}
.deleteBtn {
  background-color: #d11a2a;
}
.patchBtn {
  background-color: #ff9800;
}
.updateSketches > input {
  margin: 5px;
}
</style>