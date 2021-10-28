<template>
  <div>
    <div>
      <img class="back-arrow" @click="$router.push('/')" src="@/assets/curved-arrow-220.svg" alt="back" width="50" height="50">
    </div>
    <div>    
      <img src="@/assets/feedback-message-4644.svg" alt="message" width="50" height="50">  
      <h1>Mailbox</h1>
      <h3>Inbox: {{ user }}</h3>
            <div @click="displaySentMsgs">CLICK TO SE
      <div v-if="showSentMsgs">
      <SentMessages v-for="msg in sentMsgs" :key="msg.message" :msg="msg" />
      </div>
      </div>
      <p>Feedback från kund för underkända skissförslag.</p>
      <p class="underline">Klicka på det specifika draft-ID som finns tillgänglig under varje meddelanderuta för att se skissförslag som underkänts.</p>
      <Inbox @postMessage="listen" :user="user" v-for="msg in mailbox" :key="msg.created_at" :msg="msg" />
    </div>
  </div>
</template>

<script>
import Inbox from '@/components/Inbox'
import SentMessages from '@/components/SentMessages'

export default {
  name: 'MailboxContacts',

  components: {
  Inbox,
  SentMessages
  },

 data() {
    return {
      showSentMsgs: false
    };
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
  },
  sentMsgs() {
  return this.$store.state.mailbox.filter(msg => msg.sender === this.user);
  }
  },

  methods: {
  listen(message) {
  this.$store.dispatch("postMailbox", message);     
  },
  displaySentMsgs() {
  this.showSentMsgs = true
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