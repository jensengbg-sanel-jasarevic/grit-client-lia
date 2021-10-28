<template>
  <div>
      {{ msg.sender }}
  </div>
</template>

<script>
export default {
  name: 'SentMessages',

  props: {
    msg: Object
  },      

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>