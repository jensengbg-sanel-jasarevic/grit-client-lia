<template>
  <div class="upload-file-component-wrapper">
    <form @submit.prevent="uploadFile" enctype="multipart/form-data">
        <label for="file-uploader">Bläddra filer
        <input type="file" id="file-uploader" accept=".jpg, .png" @change="filesChange($event.target.name, $event.target.files); fileType = $event.target.files[0].type"> 
        </label>
        <div v-if="fileSelectedInfo">
          <p class="p-upload-file">{{ filenameInfo }}</p>
          <p class="p-upload-file">Filtyp: {{ fileType }}</p>
        </div>
        <button v-if="uploadFileBtn" type="submit">Ladda upp bild</button> 
        <p v-if="fileUploadedText" class="p-upload-file">Bilduppladdning klar. Klicka på 'Skicka förslag' för att gå vidare i processen.</p>
        <button v-if="sendDraftBtn" @click="postDraft" id="post-draft-btn">Skicka förslag</button> 
        
        <div v-if="draftUploadedText">
          <p class="p-upload-file">Förslag skickad.</p>
          <p class="p-upload-file"><a href="https://vueclient-100.herokuapp.com/">Klicka här</a> för att omdirigeras till sidan för att se förslaget.</p> 
        </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'UploadFile',

 data() {
    return {
    filenameInfo: "",
    uploadFileBtn: false,
    fileSelectedInfo: false,
    fileUploadedText: false,
    sendDraftBtn: false,
    draftUploadedText: false,
    }
  },

  methods: {
 filesChange(fieldName, fileList){
  this.filenameInfo = `Filnamn: ${fileList[0].name}`  
  this.draftUploadedText = false
  this.sendDraftBtn = false
  this.fileUploadedText = false
  this.uploadFileBtn = true
  this.fileSelectedInfo = true
  },
  uploadFile(e){
    this.$store.dispatch('postSketch', e.target[0].files[0])
    this.uploadFileBtn = false
    this.fileSelectedInfo = false
    this.fileUploadedText = true
    this.sendDraftBtn = true
  },
  postDraft(){
    let filename = this.filenameInfo.split("Filnamn: ")[1];
    this.$store.dispatch('postDraft', filename)
    this.fileUploadedText = false
    this.sendDraftBtn = false
    this.draftUploadedText = true
  }
  }
    
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.upload-file-component-wrapper {
  margin-top: 2%;
}
p {
  color: #42b983;
}
a{
  font-weight: bold;
  text-decoration: none;
  font-size: 1.3em;
  color:#ff9800; 
}
label {
  cursor: pointer;
  border-radius: 5px;
  padding: 10px;
  background-color: #ff9800;
  color: white;
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
</style>