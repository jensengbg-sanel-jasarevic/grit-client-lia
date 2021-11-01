<template>
  <div class="mailbox-client-component-wrapper">
    <div>
      <img class="back-arrow" @click="$router.push('/client')" src="@/assets/curved-arrow-220.svg" alt="back" width="50" height="50">
    </div>
    <div>      
      <img src="@/assets/feedback-message-4644.svg" alt="message" width="50" height="50">      
      <h1>Mailbox</h1>
      <h2>{{ user }}</h2>
      <p>Respons från contacts för underkända skissförslag.</p>
      <p class="underline">Klicka på den specifika <i>draft</i> som finns tillgänglig under varje meddelanderuta för att öppna förslaget.</p>
      <h3>Inkorg ({{ mailboxAmount }})</h3>
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
  this.$store.dispatch("getDrafts");
  this.$store.dispatch('getRejectedDrafts')
  this.$store.dispatch('getOrders')
  },

  computed: {
  user() {
  return this.$store.state.user;
  },
  mailbox() {
  return this.$store.state.mailbox.filter(msg => msg.receiver === this.user);
  },
  mailboxAmount() {
  let total;
  let inboxUser = this.$store.state.mailbox.filter(msg => msg.receiver === this.user)
  total = inboxUser.length
  return total
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
.mailbox-client-component-wrapper {
  background-color: #fff;
  padding: 2%;
  border-radius: 5px;
}
.underline {
  border-bottom: 2px solid #1d1d1d;
  padding: 1%;
}
</style>