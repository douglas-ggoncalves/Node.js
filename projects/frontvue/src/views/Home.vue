<template>
  <div id="app">
    <div class="container">
      <div class="row d-flex justify-content-center">
        <div class="bg-dark text-center col-8 col-md-6 col-lg-4 py-4">
          <div class="m-auto pb-3">
            <img class="img-fluid" src="../assets/img/logo-white.png" />
          </div>

          <div class="col-12 col-lg-9 mx-auto">
            <form>
              <div class="input-group mt-4">
                <input type="text" class="form-control" placeholder="Digite seu usuário" v-model="login"/>
                <div class="form-control invalid-feedback" style="font-size: 1.07em; color: white" v-if="err">
                  Usuário e/ou senha incorretos
                </div>
              </div>

              <div class="input-group" style="margin-top: 20px">
                <input type="password" class="form-control" placeholder="Digite sua senha" autocomplete="on" v-model="password"/>
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

export default {
   data(){
    return {
      login: '',
      password: '',
      err: true
    }
  }, methods: {

    log(){
      if(this.login.trim() == '' || this.password.trim() == ''){
        alert("Usuário ou senha inválidos")
      } else {
        axios.post("http://localhost:4000/", {
          login: this.login,
          password: this.password
        })
        .then(res => {
          localStorage.setItem("login", res.data.login);
          localStorage.setItem("password", res.data.password);
           this.$router.push({name: "Index"})
        }).catch(err => {
          alert("Login ou senha incorretos")
          console.log(err)
        })
      }
    }
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

</style>