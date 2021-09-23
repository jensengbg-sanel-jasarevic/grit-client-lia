<template>
  <div>    

    <div class="order-wrapper" @click="displayImage">
      <span class="bold">Order ID: </span>
      <span> {{ order.id }} </span>
      <span class="bold">Message: </span>
      <span>{{ order.message }} </span>
      <span class="bold">Created at: </span>
      <span>{{ order.created_at }} </span>
      <p class="show-more">Show more</p>
      
      <div :id="order.id"></div>

    </div>

  </div>
</template>

<script>
export default {
  name: 'OrdersList',

  props: {
    order: Object
  },

  methods: {
  displayImage(){
  this.$store.dispatch("getOrderImage", this.order);  
  },
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
span {
  font-size: 0.8em;
}
.bold {
  font-weight: bold;
}
.changes {
  color: red;
}
.show-more {
  margin: 1%;
}
.order-wrapper {
  margin-left: 1%;
  margin-right: 1%;
  margin-bottom: 1%;
  border: none;
  border-radius: 5px;
  background-color: #777;
  padding: 10px;
  color: white;
  cursor: pointer;
}
</style>
