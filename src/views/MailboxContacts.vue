<template>
  <div class="mailbox-contacts-component-wrapper">
    <div>
      <img class="back-arrow" @click="$router.push('/')" src="@/assets/curved-arrow-220.svg" alt="back" width="50" height="50">
    </div>
    <div>    
      <img src="@/assets/feedback-message-4644.svg" alt="message" width="50" height="50">  
      <h1>Mailbox</h1>
      <h2>{{ user }}</h2>
      <p>Feedback från kunder för skissförslag &amp; bekräftande mail gällande godkända/underkända skissförslag.</p>
      <p class="underline">Klicka på den specifika <i>draft</i> som finns tillgänglig under varje meddelanderuta för att se förslaget.</p>
      <div class="mailbox-container">
        <div class="left-box">
          <h3>Inkorg ({{ mailboxAmount }})</h3>
          <Inbox @postMessage="listen" :user="user" v-for="msg in mailbox" :key="msg.created_at" :msg="msg" />
        </div>        
        <div class="right-box">
          <h3>Skickat ({{ sentAmount }})</h3>
          <SentMessage v-for="msg in sent" :key="msg.id" :msg="msg" />
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import Inbox from '@/components/Inbox'
import SentMessage from '@/components/SentMessage'

export default {
  name: 'MailboxContacts',

  components: {
  Inbox,
  SentMessage
  },

  beforeMount(){
  this.$store.dispatch('verifyActiveUser')
  this.$store.dispatch('getMailbox')
  this.$store.dispatch('getOrders')
  },

  computed: {
  user() {
  return this.$store.state.user;
  },    
  mailbox() {
  return this.$store.state.mailbox
  },
  sent() {
  return this.$store.state.sent
  },
  mailboxAmount() {
  let total;
  let inbox = this.$store.state.mailbox
  total = inbox.length
  return total
  },
  sentAmount() {
  let total;
  let sent = this.$store.state.sent
  total = sent.length
  return total
  }     
  },

  methods: {
  listen(message) {
  this.$store.dispatch("postMailbox", message);
  setTimeout( () => { this.$store.dispatch("getMailbox") }, 900)
  },
  }

}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mailbox-contacts-component-wrapper {
  background-color: #fff;
  padding: 2%;
  border-radius: 5px;
}
.mailbox-container {
  display: grid;
  grid-template-columns: 60% 40%;
}
.underline {
  border-bottom: 2px solid #1d1d1d;
  padding: 1%;
}
@media(max-width: 900px) {
  .mailbox-container {
    grid-template-columns: 1fr;    
  }
}
</style>