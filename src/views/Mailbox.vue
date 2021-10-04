<template>
  <div class="mailbox">
    <h1>Mailbox kund</h1>
    <p>Klicka på det specifika draft-ID som finns tillgänglig under varje meddelanderuta för att öppna skissförslaget.</p>
      <Inbox v-for="msg in inboxClient" :key="msg.id" :msg="msg" />
  </div>
</template>

<script>
import Inbox from '@/components/Inbox'

export default {
  name: 'MailBox',

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
  }

}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
p{
  border-bottom: 1px solid white;
  padding: 1%;
}
</style>