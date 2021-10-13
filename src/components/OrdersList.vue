<template>
  <div>    

    <div class="order-wrapper">
      <span class="bold">| Order ID: </span>
      <span id="order-id"> {{ order.id }} | </span>
      <span class="bold">Message: </span>
      <span>{{ order.message }} | </span>
      <span class="bold">Created At: </span>

      <span>{{ order.created_at }} |</span>
      <button @click="displayImage" class="show-more" :id="`show-more-order-btn${order.id}`" :disabled="disableShowMoreBtn">{{ displayImageBtnText }}</button>
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
    displayImageBtnText: "Visa mer",
    disableShowMoreBtn: false
    };
  },

  methods: {
  displayImage(){
  this.$store.dispatch("getImage", { req: this.order, vueComponent: "OrdersList.vue" });
  this.disableShowMoreBtn = true
  setTimeout( () => {   this.displayImageBtnText = `Order-ID #${this.order.id}` }, 1000)
  let btn =  document.getElementById(`show-more-order-btn${this.order.id}`)
  btn.style.cursor = "initial";
  btn.style.textDecoration = "initial"
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
.show-more {
  all: unset;
  display: block;
  margin: 0 auto;
  cursor: pointer;
  font-weight: bold;
  font-size: 25px;
  text-decoration: underline;
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
