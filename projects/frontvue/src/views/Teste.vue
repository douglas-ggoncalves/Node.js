<template>
    <div>
        
    <modal name="my-first-modal">
        This is my first modal
    </modal>

    <button @click="show()">
        Cadastrar Loja
    </button>
    </div>
</template>

<script>
import VModal from 'vue-js-modal'
import Vue from 'vue'

Vue.use(VModal)

export default {
//name: 'MyComponent',
    methods: {
        show () {
            this.$modal.show('my-first-modal');
        },
        hide () {
            this.$modal.hide('my-first-modal');
        }
    },
    mount () {
        this.show()
    }
}
</script>
