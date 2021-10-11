import Vue from 'vue'
import VueRouter from 'vue-router'
import Client from '../views/Client.vue'
import Contacts from '../views/Contacts.vue'
import MailboxClient from '../views/MailboxClient.vue'
import MailboxContacts from '../views/MailboxContacts.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Client',
    component: Client
  },
  {
    path: '/contacts',
    name: 'Contacts',
    component: Contacts
  },
  {
    path: '/mailbox-client',
    name: 'MailboxClient',
    component: MailboxClient
  },
  {
    path: '/mailbox-contacts',
    name: 'MailboxContacts',
    component: MailboxContacts
  }
]

const router = new VueRouter({
  routes
})

export default router
