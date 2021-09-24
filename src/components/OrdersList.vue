<template>
  <div>    

    <div class="order-wrapper">
      <span class="bold">| Order ID: </span>
      <span> {{ order.id }} | </span>
      <span class="bold">Message: </span>
      <span>{{ order.message }} | </span>
      <span class="bold">Created At: </span>
      <span>{{ order.created_at }} |</span>
      <button class="show-more" @click="displayImage">{{ displayImageBtnText }}</button>
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

data() {
    return {
    disableDisplayImageBtn: false,
    displayImageBtnText: "Visa mer",
    };
  },

  methods: {
  displayImage(){
  this.$store.dispatch("getOrderImage", this.order);
  this.disableDisplayImageBtn = true;  
  setTimeout( () => {   this.displayImageBtnText = "" }, 1000)
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
  all: unset;
  display: block;
  margin: 0 auto;
  cursor: pointer;
  font-weight: bold;
  font-size: 25px;
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
}
</style>
