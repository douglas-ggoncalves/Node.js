import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Replic from '../views/Replic.vue'
import Index from '../views/Index.vue'
import Representative from '../views/Representative.vue'
import AdminUsers from '../views/Admin/AdminUsers.vue'
import Teste from '../views/Teste.vue'
import axios from 'axios';
import scrypt from "../assets/js/scrypt";

var serverIP = scrypt.serverIP

async function AdminAuth(to, from, next) {
  console.log("console aqui ")
  if(localStorage.getItem('token') != undefined) {
    var req = {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    }
    
    var redeUser = localStorage.getItem("redeIdUser")
    var roleUser = localStorage.getItem("roleUser")
    var loginUser = localStorage.getItem("loginUser")
   
    await axios.post(`http://${serverIP}/validate`, {redeUser, roleUser, loginUser}, req).then(() => {
      //console.log(redeUser + ' ' + roleUser)
      next();
    }).catch(err => {
      console.log(err.response)
      alert(err)
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
    path: '*',
    name: 'DefaultRouter',
    component: Home
  },
  {
    path: '/conta/:token',
    name: 'HomeRecover',
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
    component: AdminUsers/*,
    beforeEnter: AdminAuth*/
  },
  {
    path: '/teste',
    name: 'Teste',
    component: Teste,
    beforeEnter: AdminAuth
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
