<template>
  <div>
    <div>
      <img class="back-arrow" @click="$router.push('/client')" src="@/assets/curved-arrow-220.svg" alt="back" width="50" height="50">
    </div>
    <div>      
      <img src="@/assets/feedback-message-4644.svg" alt="message" width="50" height="50">      
      <h1>Mailbox</h1>
      <h3>Inbox: {{ user }}</h3>
      <p>Respons från contacts för underkända skissförslag.</p>
      <p class="underline">Klicka på det specifika draft-ID som finns tillgänglig under varje meddelanderuta för att öppna skissförslaget.</p>
      <Inbox @postMessage="listen" :user="user" v-for="msg in mailbox" :key="msg.id" :msg="msg" />
    </div>
  </div>
</template>

<script>
import Inbox from '@/components/Inbox'

export default {
  name: 'MailboxClient',

  components: {
  Inbox
  },

  beforeMount(){
  this.$store.dispatch('getMailbox')
  },

  computed: {
  user() {
  return this.$store.state.user;
  },
  mailbox() {
  return this.$store.state.mailbox.filter(msg => msg.receiver === this.user);
  }
  },

  methods: {
  listen(message) {
  this.$store.dispatch("postMailbox", message);     
  }
  }
  
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.underline{
  border-bottom: 2px solid #1d1d1d;
  padding: 1%;
}
</style>