<template>
  <Multiselect
    v-model="value"
    :options="options"
  />
</template>

<script>
import Multiselect from '@vueform/multiselect'
<style src="@vueform/multiselect/themes/default.css"></style>

export default {
  components: {
    Multiselect,
  },
  data() {
    return {
      value: null,
      options: [
        'Vue',
        'Script',
        'Com',
      ]
    }
  }
}
</script>

<style>

</style>