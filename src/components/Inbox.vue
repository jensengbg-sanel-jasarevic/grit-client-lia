<template>
  <div>
      <span>On draft ID: {{ msg.id }}, comment: {{ msg.comment }}</span>
  </div>
</template>

<script>
export default {
  name: 'Inbox',

  props: {
      msg: Object
  }      
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
