import Vue from 'vue'
import VueRouter from 'vue-router'
import Store from '../store/index.js'
import Contacts from '../views/Contacts.vue'
import OrdersContacts from '../views/OrdersContacts.vue'
import MailboxContacts from '../views/MailboxContacts.vue'
import Client from '../views/Client.vue'
import MailboxClient from '../views/MailboxClient.vue'
import OrdersClient from '../views/OrdersClient.vue'
import RejectedClient from '../views/RejectedClient.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'Contacts',
      component: Contacts,
      meta: { requiresAuth: true, requiresAdminRole: true }
    },
    {
      path: '/orders-contacts',
      name: 'OrdersContacts',
      component: OrdersContacts,
      meta: { requiresAuth: true, requiresAdminRole: true }
    },
    {
      path: '/mailbox-contacts',
      name: 'MailboxContacts',
      component: MailboxContacts,
      meta: { requiresAuth: true, requiresAdminRole: true }
    },
    {
      path: '/client',
      name: 'Client',
      component: Client,
      meta: { requiresAuth: true }
    },  
    {
      path: '/mailbox-client',
      name: 'MailboxClient',
      component: MailboxClient,
      meta: { requiresAuth: true }
    },
    {
      path: '/orders-client',
      name: 'OrdersClient',
      component: OrdersClient,
      meta: { requiresAuth: true }
    },
    {
      path: '/rejected-client',
      name: 'RejectedClient',
      component: RejectedClient,
      meta: { requiresAuth: true }
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
})

router.beforeEach((to, from, next) => {
if (to.matched.some(record => record.meta.requiresAuth)) {

  if(Store.state.role === null) { 
    next({ path: '/login', query: { redirect: to.fullPath } })
  } 
  next()
  } 

if (to.matched.some(record => record.meta.requiresAdminRole)) {
  if(Store.state.role === "client") { 
  next({ path: '/client', query: { redirect: to.fullPath } })
  }
  next()
}

else {
  next()
}

})

export default router