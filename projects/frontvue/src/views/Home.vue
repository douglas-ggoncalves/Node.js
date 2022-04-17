<template>
  <div id="app">
    <div class="container">
      <div class="position-fixed top-0 start-50 translate-middle-x p-3" style="z-index: 11" v-if="err != ''">
        <div id="liveToast" class="toast show" role="alert" aria-live="assertive" aria-atomic="true" style="">
          <div class="toast-header">
            <img src="../assets/img/icone_maximus_gestao.png" style="height: 30px" class="rounded img-fluid me-2" alt="...">
            
            <strong class="me-auto">Maximus Gestão</strong>
            <button type="button" class="btn-close" @click="closeToast()"></button>
          </div>
          <div class="toast-body text-white bg-primary">
            {{ err }}
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
                <button type="button" class="btn btn-link">
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
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import scrypt from "../assets/js/scrypt";

export default {
   data(){
    return {
      login: '',
      password: '',
      err: '',
      serverIP: ''
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
    clear(){
      this.err = '';
      document.getElementById('inputLogin').classList.remove("is-invalid");
      document.getElementById('inputPassword').classList.remove("is-invalid");
    },
    closeToast(){
      this.err = '';
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