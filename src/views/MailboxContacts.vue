<template>
  <div>
    <div>
      <img class="back-arrow" @click="$router.push('/')" src="@/assets/curved-arrow-220.svg" alt="back" width="50" height="50">
    </div>
    <div>    
      <img src="@/assets/feedback-message-4644.svg" alt="message" width="50" height="50">  
      <h1>Mailbox</h1>
      <h3>Inbox: contacts</h3>
      <p>Feedback från kund för underkända skissförslag.</p>
      <p class="underline">Klicka på det specifika draft-ID som finns tillgänglig under varje meddelanderuta för att se skissförslag som underkänts.</p>
      <Inbox @postMessage="listen" v-for="msg in inboxContacts" :key="msg.created_at" :msg="msg" />
    </div>
  </div>
</template>

<script>
import Inbox from '@/components/Inbox'

export default {
  name: 'MailboxContacts',

  components: {
  Inbox
  },

  beforeMount(){
  this.$store.dispatch('getInboxContacts')
  },

  computed: {
  inboxContacts() {
  return this.$store.state.inboxContacts;
  }
  },

  methods: {
  listen(message) {
  this.$store.dispatch("postMsgToClient", message);     
  }
  },

}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.underline{
  border-bottom: 2px solid #1d1d1d;
  padding: 1%;
}
</style>