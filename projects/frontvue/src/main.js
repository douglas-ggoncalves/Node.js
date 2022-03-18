import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import VModal from 'vue-js-modal'
import 'bootstrap-vue/dist/bootstrap-vue.css';
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(VModal)

import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
