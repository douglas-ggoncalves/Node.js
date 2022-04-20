<template>
  <div id="app">
    <div class="container">

      <div class="vm--overlay" style="z-index: 9999" @click="closeToastErr()" v-if="err != ''">
              <div class="position-fixed top-0 start-50 translate-middle-x p-3">
                <div id="liveToast" class="toast show" role="alert" aria-live="assertive" aria-atomic="true" style="">
                  <div class="toast-header">
                    <img src="../assets/img/icone_maximus_gestao.png" style="height: 30px" class="rounded img-fluid me-2" alt="...">
                    
                    <strong class="me-auto">Maximus Gestão</strong>
                    <button type="button" class="btn-close" @click="closeToastErr()"></button>
                  </div>
                  <div class="toast-body text-white bg-primary">
                    {{ err }}
                  </div>
                </div>
              </div>
            </div>

      <div class="row d-flex justify-content-center">
        <div class="bg-dark text-center col-8 col-md-6 col-lg-4 py-4">
          <div class="m-auto pb-3">
            <img class="img-fluid" src="../assets/img/logo-white.png" />
          </div>

          <div class="col-12 col-lg-9 mx-auto">
            <form>
              <div class="mt-4">
                <input id="inputLogin" type="text" class="form-control" placeholder="Digite seu usuário" v-model="login" @keydown="clear()">
              </div>

              <div class="mt-4">
                <input id="inputPassword" type="password" class="form-control" placeholder="Digite sua senha" autocomplete="on" v-model="password"
                @keydown="clear()">
                <div class="invalid-feedback" v-if="err">
                  Usuário e/ou senha incorretos
                </div>
              </div>

              <div class="row d-flex justify-content-center mt-3">
                <button type="button" class="btn btn-outline-light" @click="log()">
                  Entrar
                </button>
              </div>

              <div class="row d-flex justify-content-center">
                <button type="button" class="btn btn-link" @click="recoverPassword()">
                  Esqueci minha senha
                </button>
              </div>

              <div class="row d-flex justify-content-center">
                <button type="button" class="btn btn-link text-white">
                  Cadastrar-se
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <modal name="modalRecovery">
        <div class="row">
          <h4>Recuperar Senha</h4>
          <hr>
        </div>

        <div class="row d-flex justify-content-center align-items-center my-auto" style="border: 1px solid red">
          <div class="col-10">
            <Label for="loginUser">Informe o seu e-mail</Label>
            <input type="email" id="inputRecover" class="form-control w-100" v-model="emailForRecovery" required @keydown="clear()">
            <div class="invalid-feedback" v-if="err">
              Email inválido
            </div>
          </div>

          <div class="col-10 text-center">  
            <button type="button" class="btn btn-success" @click="recoverPasswordUser()">
              Recuperar Senha
            </button>
          </div>
        </div>
        
      </modal>

      <modal class="mx-5 mx-md-0" name="modalRecovery2">
        <div class="row d-flex align-items-center justify-content-center mx-auto my-auto h-100">
          <div>
            <div class="col-10 mx-auto">
              <h5>Um e-mail foi enviado para {{ emailForRecovery }} com as instruções para a recuperação de senha</h5>
            </div>

            <div class="row d-flex justify-content-center mt-3">
              <div class="col">
                <button type="button" class="btn btn-success" @click="criarEssaFuncao()">
                  Confirmar
                </button>
              </div>
              
            </div>
          </div>
        </div>
      </modal>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import scrypt from "../assets/js/scrypt";
import Vue from 'vue'
import VModal from 'vue-js-modal'

Vue.use(VModal, {
  dynamicDefaults: {height: 'auto'} 
})

export default {
   data(){
    return {
      login: '',
      password: '',
      err: '',
      serverIP: '',
      emailForRecovery: '',
      codeForRecovery: '',
    }
  }, methods: {
    async log(){
      if(this.login.trim() == '' || this.password.trim() == ''){
        this.err = `Usuário e/ou senha inválidos`
        document.getElementById('inputLogin').classList.add("is-invalid")
        document.getElementById('inputPassword').classList.add("is-invalid")
      } else {
        await axios.post(`http://${this.serverIP}/login`, {
          login: this.login,
          password: this.password
        })
        .then(res => {
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("roleUser", res.data.user.CARGO_USUARIO);
          localStorage.setItem("redeIdUser", res.data.user.REDEID_USUARIO);
          this.$router.push({name: "Index"})
        }).catch(err => {
          this.err = `${err.response.data.err}`
          document.getElementById('inputLogin').classList.add("is-invalid")
          document.getElementById('inputPassword').classList.add("is-invalid")
          if(err.response){
            this.err = `${err.response.data.err}`
          } else{
            this.err = `${err}`
          }
        })
      }
    }, 
    async recoverPasswordUser(){
      if(this.emailForRecovery.trim() == ''){
        this.err = 'Email precisa ser preenchido'
      } else if(!this.emailForRecovery.includes("@")){
        this.err = 'Email inválido'
      }else{
        await axios.post(`http://${this.serverIP}/senha`, {
          email: this.emailForRecovery
        })
        .then(res =>{
          console.log(res.data)
          this.$modal.hide('modalRecovery');
          this.$modal.show('modalRecovery2');
        }).catch(err => {
          this.err = err.response.data.err
          document.getElementById('inputRecover').classList.add("is-invalid");
        })
      }
    },
    clear(){
      this.err = '';
      document.getElementById('inputLogin').classList.remove("is-invalid");
      document.getElementById('inputRecover').classList.remove("is-invalid");
      document.getElementById('inputPassword').classList.remove("is-invalid");
    },
    closeToast(){
      this.err = '';
    },
    recoverPassword(){
      this.$modal.show('modalRecovery');
    },
    closeToastErr(){
      this.err = ''
    }
  }, created(){
    this.serverIP = scrypt.serverIP
  }
};
</script>

<style scoped>
#app {
  display: flex !important;
  align-items: center !important;
  min-height: 100vh !important;
  background: linear-gradient(to bottom, #2b88dc 0%, #31374f 100%) !important;
}

html, body, template {
  min-height: 100vh !important;
}

button {
  cursor: pointer;
}

.btn.btn-link{
  text-decoration: none !important;
}

.toast{
  border: none;
}

</style>