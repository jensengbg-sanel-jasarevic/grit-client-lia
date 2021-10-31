<template>
  <div class="upload-file-component-wrapper">
    <form @submit.prevent="uploadFile" enctype="multipart/form-data">
        <label for="file-uploader">Bläddra filer
        <input type="file" id="file-uploader" accept=".jpg, .png" @change="filesChange($event.target.name, $event.target.files); fileType = $event.target.files[0].type"> 
        </label>
        <div v-if="fileSelectedInfo">
          <p class="green-text">{{ filenameInfo }}</p>
          <p class="green-text">Filtyp: {{ fileType }}</p>
        </div>
        <button v-if="uploadFileBtn" type="submit">Ladda upp bild</button> 
        
        <div v-if="fileUploadedText">
          <p class="green-text">Bilduppladdning klar.</p>
          <p class="green-text">Ange mottagarens användarkonto där det uppladdade förslaget ska sändas till för att slutföra processen.</p>
        </div>

        <div v-if="sendDraftBtn" class="post-draft-box">
          <input type="text" name="recipient" v-model="recipient" autocomplete="off" placeholder="Användarkonto">
          <button @click="postDraft" id="post-draft-btn">Skicka</button> 
        </div>

        <p v-if="draftText">{{ draftMessage }}</p>
    </form>
  </div>
</template>

<script>
export default {
  name: 'UploadFile',
  
  props: {
    user: String
  },

 data() {
    return {
    filenameInfo: "",
    recipient: null,
    uploadFileBtn: false,
    fileSelectedInfo: false,
    fileUploadedText: false,
    sendDraftBtn: false,
    draftText: false,
    }
  },
  
  computed: {
  draftMessage() {
  return this.$store.state.draftMessage;
  }
  },

  methods: {
 filesChange(fieldName, fileList){
  this.filenameInfo = `Filnamn: ${fileList[0].name}`  
  this.draftText = false
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
    const receiverInfo = {
      sender: this.user,
      receiver: this.recipient,
      filename: this.filenameInfo.split("Filnamn: ")[1],
    }
    this.$store.dispatch('postDraft', receiverInfo)
    this.fileUploadedText = false
    this.sendDraftBtn = false
    this.draftText = true
  }
  }
    
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.upload-file-component-wrapper {
  margin-top: 2%;
}
.green-text {
  color: #42b983;
}
#rejected {
  color: #DC143C;
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
.post-draft-box > input {
  border: none; 
  border:solid 1px #ccc;
  border-radius: 10px;
  outline: none;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  padding: 10px;
}
</style>