<template>
  <div class="orders-list-component-wrapper">
      <span>Kund: {{ order.client }}</span>
      <span> | </span>
      <span id="bold">Order ID # {{ order.id }}</span>
      <button @click="displayImage" class="show-more" :id="`show-more-btn${order.id}`" :disabled="disableBtn">{{ btnText }}</button>
      <div :id="order.id"></div>
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
    btnText: "Visa mer",
    disableBtn: false
    };
  },

  methods: {
  displayImage(){
  this.$store.dispatch("getImage", { req: this.order, vueComponent: "OrdersList.vue" });
  this.disableBtn = true
  setTimeout( () => {   
    this.btnText = `Order-ID #${this.order.id}`
    }, 1000)
  let btn =  document.getElementById(`show-more-btn${this.order.id}`)
  btn.style.cursor = "initial";
  btn.style.textDecoration = "initial"
  },
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.orders-list-component-wrapper {
  margin-left: 15%;
  margin-right: 15%;
  margin-bottom: 1%;
  border: none;
  border-radius: 5px;
  background-color: #777;
  padding: 10px;
  color: white;
}
#span {
  font-size: 0.8em;
  font-weight: bold;
}
.show-more {
  all: unset;
  display: block;
  margin: 0 auto;
  cursor: pointer;
  font-weight: bold;
  font-size: 25px;
}
</style>
