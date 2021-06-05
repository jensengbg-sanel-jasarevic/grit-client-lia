<template>
  <div class="mailbox-client">
    <h1>Mailbox Client</h1>
      <ClientInbox v-for="msg in inboxClient" :key="msg.id" :msg="msg.messages" />
  </div>
</template>

<script>
import ClientInbox from '@/components/ClientInbox'

export default {
  name: 'MailBoxClient',

  components: {
  ClientInbox
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

</style>