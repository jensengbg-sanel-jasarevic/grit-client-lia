<template>
  <div class="keygenerator-component-wrapper">
    <h1>Bjud in ny kund</h1>
    <p>Generera en nyckel som kan utnyttjas av kund till att skapa konto.</p>
    <button @click="generateUserKey">Generera nyckel</button>
    <div v-if="generatedKey" id="generated-key">
      <p>Användarnyckel:</p>
      <p> {{ generatedKey }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'KeyGenerator',

  computed: {      
  generatedKey() {
  return this.$store.state.generatedKey;
  }
  },

  methods: {
  generateUserKey(){
  this.$store.dispatch("generateUserKey");
  }    
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.keygenerator-component-wrapper{
    margin-top: 10%;
}
button{
  border: none;
  height: 40px;
  width: 130px;
  border-radius: 5px;
  background-color: #ff9800;
  color: white;
  cursor: pointer;
}
#generated-key{
  color: #42b983;
}
</style>