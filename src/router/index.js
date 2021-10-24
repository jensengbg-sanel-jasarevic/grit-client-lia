import Vue from 'vue'
import VueRouter from 'vue-router'
import Contacts from '../views/Contacts.vue'
import OrdersContacts from '../views/OrdersContacts.vue'
import MailboxContacts from '../views/MailboxContacts.vue'
import Client from '../views/Client.vue'
import MailboxClient from '../views/MailboxClient.vue'
import ApprovedClient from '../views/ApprovedClient.vue'
import RejectedClient from '../views/RejectedClient.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Contacts',
    component: Contacts
  },
  {
    path: '/orders-contacts',
    name: 'OrdersContacts',
    component: OrdersContacts
  },
  {
    path: '/mailbox-contacts',
    name: 'MailboxContacts',
    component: MailboxContacts
  },
  {
    path: '/client',
    name: 'Client',
    component: Client
  },  
  {
    path: '/mailbox-client',
    name: 'MailboxClient',
    component: MailboxClient
  },
  {
    path: '/approved-client',
    name: 'ApprovedClient',
    component: ApprovedClient
  },
  {
    path: '/rejected-client',
    name: 'RejectedClient',
    component: RejectedClient
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router
