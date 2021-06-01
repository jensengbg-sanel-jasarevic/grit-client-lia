<template>
  <div>
      <span><b>Draft ID: </b>{{ msg.id }}, <b>Comments: </b>{{ msg.comment }}</span>
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
