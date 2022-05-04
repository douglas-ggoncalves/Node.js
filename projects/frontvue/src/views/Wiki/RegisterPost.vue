
<template>
  <div class="home" id="divMainReplic">
    <div class="wrapper">
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
            <a href="wiki">Wiki</a>
          </li>
          
          <li>
            <a href="javascript:;" @click="logout()">Sair</a>
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

        <div class="container">
          <div class="row d-flex justify-content-center mt-3">
            <div class="col-12">
              <input id="inputTitle" type="text" class="form-control" v-model="title" placeholder="Informe o título do post" @keydown="clearErrTitle()">
              <div class="invalid-feedback" v-if="errTitle">
                {{ errTitle }}
              </div>
            </div>
          </div>

          <div class="row d-flex justify-content-center mt-3">
            <div class="col-12">
              <editor
              :api-key="myTokenTiny"
              placeholder= "Forneça o passo a passo do tutorial com palavras/fotos e/ou vídeos..."
              v-model="desc"
              @keydown="clearErrDesc()"

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
              <div id="divErrDesc" style="margin-top: 0.25rem; font-size: 0.875em; color: #dc3545;" v-if="errDesc">
                {{ errDesc }}
              </div>
            </div>
          </div>

          <div class="row d-flex justify-content-center mt-3">
            <div class="col-6">
            <multiselect v-model="value" deselect-label="Remover Status" selectLabel="Selecionar essa opção" selectedLabel="Opção selecionada" placeholder="Selecionar um status" :options="options" :searchable="false" :allow-empty="true">
              {{ options }}
            </multiselect>

            </div>
          </div>
          
          <div class="row d-flex justify-content-center mt-2">
            <div class="col-6">
              <b-button-group>
                <b-button variant="success" @click="registerPost()">Salvar</b-button>
              </b-button-group>
            </div>
          </div>

          <div class="vm--overlay" style="z-index: 9999" @click="closeToastErr()" v-if="err != ''">
            <div class="position-fixed top-0 start-50 translate-middle-x p-3">
              <div id="liveToast" class="toast show" role="alert" aria-live="assertive" aria-atomic="true" style="">
                <div class="toast-header">
                  <img src="../../assets/img/icone_maximus_gestao.png" style="height: 30px" class="rounded img-fluid me-2" alt="...">
                  
                  <strong class="me-auto">Maximus Gestão</strong>
                  <button type="button" class="btn-close" @click="closeToastErr()"></button>
                </div>
                <div class="toast-body text-white bg-primary">
                  {{ err }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script src="/path/to/tinymce.min.js"></script>
<script>

import '../../assets/style/style.css'
import Multiselect from 'vue-multiselect'
import Vue from 'vue'
import axios from 'axios'
import Editor from '@tinymce/tinymce-vue'
import scrypt from "../../assets/js/scrypt";

Vue.component('multiselect', Multiselect)

export default {
  
  data() {
    return {
      value: '',
      options: ['Ativo', 'Inativo'],
      title: '',
      errTitle: '',
      errDesc: '',
      desc: '',
      roleUserLogged: '',
      err: '',
      serverIP: '',
      myTokenTiny: 'uh8htti14est749fpsiu62185d85fz8ev62uj4p8jxyrifa4'
    }
  },
  created(){
    this.serverIP = scrypt.serverIP
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
    },
    closeToastErr(){
      this.err = ''
    },
    registerPost(){
      console.log("value " +this.value)
      if(this.title.trim() == ''){
        this.err = 'Título não pode ser vazio'
        document.getElementById("inputTitle").classList.add("is-invalid")
        this.errTitle = 'Informe um título'
      } else if(this.desc.trim() == ''){
        this.err = 'Descrição não pode ser vazia'
        this.errDesc = 'Informe uma descrição no campo logo a cima'
      } else if(this.value == ''){
        this.err = 'Status não pode estar vazio'
      } else{
        axios.post(`http://${serverIP}/post`,{
          title: title,
          desc: desc
        }).then(res => {
          console.log(res)
        }).catch(err => {
          console.log(err)
        })
      }
    },
    clearErrTitle(){
      this.errTitle = '';
      document.getElementById('inputTitle').classList.remove("is-invalid");
    },
    clearErrDesc(){
      console.log("teste")
      this.errDesc = '';
    }
  },
  components: {
    'editor': Editor
  }
}

</script>
