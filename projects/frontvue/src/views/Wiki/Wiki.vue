
<template>
  <div id="app" >
    <div id="wiki" class="wrapper">
      <nav id="sidebar">
        <ul class="list-unstyled components">
          <div class="sidebar-header">
            <img class="img-fluid" src="../../assets/img/logo-white.png">
            <hr>
          </div>

          <li v-if="roleUserLogged == 'M' || roleUserLogged == 'A'">
            <a href="usuarios">Gestão de Usuários</a>
          </li>

          <li>
            <a href="replicacoes">Replicação</a>
          </li>

          <li>
            <a href="#">Wiki</a>
          </li>

          <li>
            <a href="javascript:;" @click="logout()">Sair</a>
          </li>

        </ul>
      </nav>

      <div id="content">
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div class="container-fluid">
            <button type="button" id="sidebarCollapse" class="btn btn-outline-dark" @click="clique()">
              <span class="navbar-toggler-icon"></span>
            </button>
          </div>
        </nav>

        <b-container class="bg-light py-3" fluid>
          <b-row class="d-flex justify-content-center">
            <b-col class="d-flex align-items-center" sm="10" vertical-align="center">
              <div>
                <h3 class="mt-3">
                  Seja bem Vindo
                  <font-awesome-icon icon="fa-solid fa-bars" />
                </h3>
                <h6 class="m-3">
                  Esse Wiki é uma coleção de páginas interligadas e cada uma delas pode ser visitada por qualquer pessoa porém editada pelos
                  funcionários do sistema Maximus, aqui você irá encontrar tutorias das funções do sistema
                </h6>
                <a href="cadastrar-post"  v-if="roleUserLogged == 'M'">
                  <b-button>
                    Cadastrar Post
                  </b-button>
                </a>
              </div>
            </b-col>
          </b-row>
        </b-container>

        <b-container fluid>
          <b-row class="d-flex justify-content-center mt-3">
            <h3>O que você procura?</h3>

            <b-col sm="6">
              <b-form-input  placeholder="Digite o que você está procurando" list="my-list-id"></b-form-input>

              <datalist id="my-list-id">
                <option>Manual Option</option>
                <option v-for="(size, index) in sizes" :key="index">{{ size }}</option>
              </datalist>
            </b-col>
          </b-row>

          <b-row class="d-flex justify-content-center mt-5">
            <b-col cols="12">
              <b-button-group>
                <b-button v-b-tooltip.hover.v-primary.top="'Tutoriais do módulo Balcão'" variant="outline-primary">Balcão</b-button>
                <b-button v-b-tooltip.hover.v-success.top="'Tutoriais do módulo Administrativo'" variant="outline-success">Administrativo</b-button>
                <b-button v-b-tooltip.hover.v-danger.top="'Tutoriais do módulo Caixa'" variant="outline-danger">Caixa</b-button>
              </b-button-group>
            </b-col>
          </b-row>
        </b-container>
      </div>
    </div>
  </div>
</template>
<script>

import '../../assets/style/style.css'
import scrypt from "../../assets/js/scrypt";

export default {
  data() {
    return {
      sizes: ['Small', 'Medium', 'Large', 'Extra Large'],
      roleUserLogged: ''
    }
  },
  created(){
    this.myFunction();
  },
  methods: {
    clique() {
      scrypt.clique(this);
    }, 
    myFunction(){
      this.roleUserLogged = localStorage.getItem("roleUser")
    },
    logout(){
      if(confirm("Deseja sair?")){
        localStorage.removeItem("token")
        localStorage.removeItem("roleUser")
        localStorage.removeItem("redeIdUser")
        localStorage.removeItem("loginUser")
        this.$router.push({name: "Home"})
      }
    }
  }
}
</script>
