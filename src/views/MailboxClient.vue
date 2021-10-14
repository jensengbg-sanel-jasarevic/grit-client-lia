<template>
  <div class="mailbox">
    <img src="@/assets/feedback-message-4644.svg" alt="message" width="50" height="50">      
    <h1>Mailbox kund</h1>
    <p>Respons från contacts för underkända skissförslag.</p>
    <p class="underline">Klicka på det specifika draft-ID som finns tillgänglig under varje meddelanderuta för att öppna skissförslaget.</p>
    <Inbox @postMessage="listen" v-for="msg in inboxClient" :key="msg.id" :msg="msg" />
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
  this.$store.dispatch('getInboxClient')
  },

  computed: {
  inboxClient() {
  return this.$store.state.inboxClient;
  }
  },

  methods: {
  listen(message) {
  this.$store.dispatch("postMsgToContacts", message);     
  }
  }
  
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.underline{
  border-bottom: 1px solid #1d1d1d;
  padding: 1%;
}
</style>