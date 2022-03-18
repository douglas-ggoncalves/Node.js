<template>
  <div class="home">
    <div class="wrapper">
        <!-- Sidebar -->
        <nav id="sidebar">
            <ul class="list-unstyled components">
                <div class="sidebar-header">
                    <img class="img-fluid" src="../assets/img/logo-white.png">
                    <hr>
                </div>

                <li>
                    <a href="replicacoes">Replicação</a>
                </li>

                <li>
                    <a href="representantes">Representante</a>
                </li>

                <li>
                    <a href="#">Sobre</a>
                </li>

                <li>
                    <a href="logout">Sair</a>
                </li>
            </ul>
        </nav>

        <div class="container-fluid" id="content">
          <nav class="navbar navbar-expand-lg navbar-light">
              <div class="container-fluid">
                  <button type="button" id="sidebarCollapse" class="btn btn-outline-dark" @click="clique()">
                      <span class="navbar-toggler-icon"></span>
                  </button>
              </div>
          </nav>

          <div class="container d-flex justify-content-center">
            <div class="row d-flex justify-content-center">
              <div class="col-12">
                <h3>Representantes</h3>
              </div>

              <div class="col-12">
                <button type="button" class="btn btn-outline-info" data-toggle="modal" data-target="#repModal">
                  Novo
                </button>

                <button class="btn btn-outline-dark edit" type="button" id="edit" data-toggle="modal"
                    data-target="#editModal">
                  <i class="fa-solid fa-pencil"></i>
                </button>

                <button class="btn btn-outline-info" @click="reloadPage()">
                    <i class="fa-solid fa-repeat"></i>
                </button>

                <button class="btn btn-outline-dark">
                  <i class="fa-solid fa-sliders"></i>
                </button>
              </div>

              <div class="col d-flex justify-content-center mt-2">
                <hr class="bg-dark w-100 m-1">
              </div>
            </div>
          </div>

            <button id="show-modal" @click="showModal = true">Show Modal</button>
            <!-- use the modal component, pass in the prop -->
            <modal v-if="showModal" @close="showModal = false">
                <!--
            you can use custom content here to overwrite
            default content
            -->
                <h3 slot="header">custom header</h3>
            </modal>

          

          <div v-if="err != undefined">
              <h3>{{ err }}</h3>
          </div>
        </div>
    </div>

    
  </div>
</template>

<script>
import axios from 'axios';
//import Vue from 'vue'
import '../assets/style/style.css'
import scrypt from "../assets/js/scrypt";

export default {
    data(){
        return {
            showModal: false,
            err: undefined
        }
    },

    created(){
        axios.get("http://localhost:4000/representantes").then(res => {
        console.log(res.data.select)
      }).catch(err => {
        console.log(err.response.data.err)
        console.log('Comando executado: ' + err.response.data.select)
        this.err = "Ocorreu um erro, cheque o console para mais informações"
      })
    },
    methods: {
      clique() {
        scrypt.clique(this);
      }
    }, 
    
}
</script>
