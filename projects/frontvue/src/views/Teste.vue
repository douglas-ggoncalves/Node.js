<template>
  <div>
       <vue-editor v-model="content" />
       <button>
           enviar
       </button>
  </div>
</template>

<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue2-editor/dist/vue2-editor.umd.min.js"></script>
<script>

import Vue from "vue";
import Vue2Editor from "vue2-editor";

Vue.use(Vue2Editor);
export default {
}
</script>

