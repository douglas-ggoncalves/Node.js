
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
            <a href="javascript:;" @click="logout()">Sair</a>
          </li>

        </ul>
      </nav>

      <div id="content">
        <nav class="navbar navbar-expand-lg navbar-light">
          <div class="container-fluid">
            <button type="button" id="sidebarCollapse" class="btn btn-outline-dark" @click="clique()">
              <span class="navbar-toggler-icon"></span>
            </button>
          </div>
        </nav>

        <b-container class="" fluid>
          <b-row class="d-flex justify-content-center">
            <b-col class="d-flex align-items-center" cols="6" vertical-align="center">
              <b-form-input v-model="title" placeholder="Informe o título do post"></b-form-input>
            </b-col>
          </b-row>

          <b-row class="d-flex justify-content-center mt-3">
            <b-col class="d-flex align-items-center" cols="12" vertical-align="center">
              <editor
              :api-key="myTokenTiny"
              placeholder= "Forneça o passo a passo do tutorial com palavras/fotos e/ou vídeos..."

              :init="{
                height: 500,
                menubar: false,
                language: 'pt_BR',
                tinydrive_token_provider: '/jwt',
                tinydrive_upload_path: '/some/other/path',
                tinydrive_google_drive_key: '<AIzaSyABQJpA4BAzrRL20s0RVP22QmcoHOZGDuk>',
                tinydrive_google_drive_client_id: '<145500733260-4jjevvn5qti1fj1ljopsbqdu7eqbh6dc.apps.googleusercontent.com>',
                plugins: [
                  'advlist autolink lists link image charmap print preview anchor',
                  'searchreplace visualblocks code fullscreen',
                  'insertdatetime media table paste code help wordcount tinydrive'
                ],
                toolbar:
                  'undo redo | formatselect | bold italic backcolor | \
                  alignleft aligncenter alignright alignjustify | \
                  bullist numlist outdent indent | removeformat | help | image | media | preview | tinydrive'
              }"/>
            </b-col>
          </b-row>
        </b-container>
        
      </div>
    </div>
  </div>
</template>
<script src="/path/to/tinymce.min.js"></script>
<script>

import '../../assets/style/style.css'
import Editor from '@tinymce/tinymce-vue'
import scrypt from "../../assets/js/scrypt";

export default {
  
  data() {
    return {
      roleUserLogged: '',
      myTokenTiny: 'uh8htti14est749fpsiu62185d85fz8ev62uj4p8jxyrifa4'
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
  },
  components: {
    'editor': Editor
  }
}

</script>
