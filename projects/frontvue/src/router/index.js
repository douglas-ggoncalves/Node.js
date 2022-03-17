import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Replic from '../views/Replic.vue'
import Index from '../views/Index.vue'
import Representative from '../views/Representative.vue'

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
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
