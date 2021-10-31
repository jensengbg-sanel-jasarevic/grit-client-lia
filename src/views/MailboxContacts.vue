<template>
  <div class="mailbox-contacts-component-wrapper">
    <div>
      <img class="back-arrow" @click="$router.push('/')" src="@/assets/curved-arrow-220.svg" alt="back" width="50" height="50">
    </div>
    <div>    
      <img src="@/assets/feedback-message-4644.svg" alt="message" width="50" height="50">  
      <h1>Mailbox</h1>
      <h2>{{ user }}</h2>
      <p>Feedback från kund för underkända skissförslag.</p>
      <p class="underline">Klicka på det specifika draft-ID som finns tillgänglig under varje meddelanderuta för att se skissförslag som underkänts.</p>
      <div class="mailbox-container">
        <div class="left-box">
          <h3>Inkorg ({{ mailboxAmount }})</h3>
          <Inbox @postMessage="listen" :user="user" v-for="msg in mailbox" :key="msg.created_at" :msg="msg" />
        </div>        
        <div class="right-box">
          <h3>Skickat ({{ sentAmount }})</h3>
          <SentMessages v-for="msg in sent" :key="msg.message" :msg="msg" />
        </div>
      </div>
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

  beforeMount(){
  this.$store.dispatch('getMailbox')
  this.$store.dispatch('getOrders')
  },

  computed: {
  user() {
  return this.$store.state.user;
  },    
  mailbox() {
  return this.$store.state.mailbox.filter(msg => msg.receiver === this.user);
  },
  sent() {
  return this.$store.state.mailbox.filter(msg => msg.sender === this.user);
  },
  mailboxAmount() {
  let total;
  let inboxUser = this.$store.state.mailbox.filter(msg => msg.receiver === this.user)
  total = inboxUser.length
  return total
  },
  sentAmount() {
  let total;
  let sentUser = this.$store.state.mailbox.filter(msg => msg.sender === this.user)
  total = sentUser.length
  return total
  }     
  },

  methods: {
  listen(message) {
  this.$store.dispatch("postMailbox", message);
  this.$store.dispatch('getMailbox')     
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