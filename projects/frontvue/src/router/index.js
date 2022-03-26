import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Replic from '../views/Replic.vue'
import Index from '../views/Index.vue'
import Representative from '../views/Representative.vue'
import AdminUsers from '../views/Admin/AdminUsers.vue'

import Teste from '../views/Teste.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/index',
    name: 'Index',
    component: Index
  },
  {
    path: '/replicacoes',
    name: 'Replic',
    component: Replic
  },
  {
    path: '/representantes',
    name: 'Representative',
    component: Representative
  },
  {
    path: '/adminUsers',
    name: 'AdminUsers',
    component: AdminUsers
  },
  {
    path: '/teste',
    name: 'Teste',
    component: Teste
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
