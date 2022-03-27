import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Replic from '../views/Replic.vue'
import Index from '../views/Index.vue'
import Representative from '../views/Representative.vue'
import AdminUsers from '../views/Admin/AdminUsers.vue'
import Teste from '../views/Teste.vue'
import axios from 'axios';

async function AdminAuth(to, from, next) {
  if(localStorage.getItem('token') != undefined) {
    var req = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    }
   
    await axios.post("http://localhost:4000/validate", {}, req).then(() => {
      //console.log(res)
      next();
    }).catch(err => {
      console.log(err.response)
      next("/");
    })
  } else{
    next("/");
  }
} 

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
    component: Replic,
    beforeEnter: AdminAuth
  },
  {
    path: '/representantes',
    name: 'Representative',
    component: Representative
  },
  {
    path: '/adminUsers',
    name: 'AdminUsers',
    component: AdminUsers,
    beforeEnter: AdminAuth
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
