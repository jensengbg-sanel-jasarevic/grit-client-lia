<template>
  <div class="contacts-mailbox">
    <h1>Mailbox contacts</h1>
    <p>Kommentarer från kund för underkända skissförslag.</p>
    <p class="underline">Klicka på det specifika draft-ID som finns tillgänglig under varje meddelanderuta för att se skissförslag som underkänts.</p>
      <InboxContacts v-for="msg in inboxContacts" :key="msg.created_at" :msg="msg" />
  </div>
</template>

<script>
import InboxContacts from '@/components/InboxContacts'

export default {
  name: 'MailboxContacts',

  components: {
  InboxContacts
  },

  beforeMount(){
  this.$store.dispatch('getInboxContacts')
  },

  computed: {
  inboxContacts() {
  return this.$store.state.inboxContacts;
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