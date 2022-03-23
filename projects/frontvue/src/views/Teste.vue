<template>
  <div id="app">
    <div class="example">
    <Multiselect
      v-model="example1.value"
      v-bind="example1"
    ></Multiselect>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import '../assets/style/style.css'

import VueCompositionAPI from '@vue/composition-api'
import Multiselect from '@vueform/multiselect/dist/multiselect.vue2.js'
Vue.use(VueCompositionAPI)

export default {
  components: {
    Multiselect
    },
  data(){
    return{
      
      example1: {
      value: 0,
      options: ['Batman', 'Robin', 'Joker']
    }
    }
  }
}
</script>

<style scoped>
.multiselect-green {
  --ms-tag-bg: #D1FAE5;
  --ms-tag-color: #059669;
}

.multiselect-blue {
  --ms-tag-bg: #DBEAFE;
  --ms-tag-color: #2563EB;
}
</style>