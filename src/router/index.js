import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Contacts from '../views/Contacts.vue'
import Mailbox from '../views/Mailbox.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/contacts',
    name: 'Contact',
    component: Contacts
  },
  {
    path: '/mailbox',
    name: 'Mailbox',
    component: Mailbox
  }
]

const router = new VueRouter({
  routes
})

export default router
