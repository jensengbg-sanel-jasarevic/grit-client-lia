<template>
  <div>
    <form @submit.prevent="postDraft" enctype="multipart/form-data">
        <label for="file-uploader">Bläddra
        <input type="file" id="file-uploader" accept=".jpg, .png"> 
        </label>
        <button id="submit-img-btn" type="submit">Lämna in bild</button>  
        <p class="uploaded-img-text"  v-if="btnSubmitted">Bilduppladdning klar. <a href="https://vueclient-100.herokuapp.com/">Klicka här</a> för att se senaste uppladdningen.</p> 
    </form>
  </div>
</template>

<script>
export default {
  name: 'UploadObject',

 data() {
    return {
    btnSubmitted: false
    }
  },

  methods: {
  postDraft(e){
  this.$store.dispatch('postDraft', e.target[0].files[0])
  this.btnSubmitted = true
  }
  }
    
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
p {
  color: #2c3e50;
}
label {
  margin-top: 1%;
  cursor: pointer;
  border-radius: 5px;
  padding: 10px;
  background-color: #ff9800;
}
input[type="file"] {
  opacity: 0; 
  width: 0;
  height: 0;
}
button {
  margin-left: 1%;
  margin-top: 1%;
  margin-bottom: 1%;
  border: none;
  border-radius: 5px;
  background-color: #42b983;
  padding: 10px;
  color: white;
  cursor: pointer;
}
.uploaded-img-text{
  font-weight: bold;
  color: #42b983;
}
a{
  font-weight: bold;
  text-decoration: none;
  font-size: 1.3em;
  color:#ff9800; 
}
</style>