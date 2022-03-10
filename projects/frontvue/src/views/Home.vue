<template>
  <div class="home">
    <h3>Home.vue</h3>
    <div v-if="err">
      <h3>{{ err }}</h3>
    </div>

    <div v-else>
      <button @click="initVerify()">
        Iniciar verificação
      </button>

      <div v-for="(poke, index) in data" :key="index">
        <h5>{{data[index]}}</h5>
      </div>

    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Vue from 'vue'

export default {
  created(){
    this.myFunction();
  },
  data() {
    return {
      err: undefined,
      data: [],
      arrays: 
        {
          idsNetworks: [],
          lojas: []
        }
    }
  },
  methods: {
    myFunction(){ axios.get("http://localhost:4000/index", )
      .then(res => {
        this.arrays.idsNetworks.push(res.data.idsNetworks)
        this.arrays.lojas.push(res.data.stores)

        for (var x=0;  x < this.arrays.idsNetworks[0].length; x++) {
          for(var i=0; i < this.arrays.lojas[0].length; i++ ){
            if(x+1 == this.arrays.lojas[0][i].id){
              if(this.arrays.lojas[0][i] != undefined){
                this.data.push(this.arrays.lojas[0][i]);
              }
            }
          }
        }
        this.initVerify()
      }).catch(err => {
        console.log("Ocorreu um erro " +err.response.data.err)
        this.err = err.response.data.err
      })
    }, 
    async initVerify(){
        for(var y=0; y < this.data.length; y++) {
          try {
            await axios.post("http://localhost:4000/replic", {array: this.data[y]})
            .then(res => {
              Vue.set(this.data, y, res.data.newArray)
            });
          } catch(err) {
            Vue.set(this.data, y, err.response.data)
          }
        }
    }
  }
}
</script>