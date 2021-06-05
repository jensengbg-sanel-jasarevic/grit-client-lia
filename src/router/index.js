import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Admin from '../views/Admin.vue'
import MailboxClient from '../views/MailboxClient.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  },
  {
    path: '/mailboxclient',
    name: 'MailboxClient',
    component: MailboxClient
  }
  
]

const router = new VueRouter({
  routes
})

export default router
