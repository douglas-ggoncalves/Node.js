<template>
  <div>
    <div class="container">
      <div class="row">
          <div class="card">
            <h4 class="card-header">Cadastrar Usuário</h4>
            <div class="card-body">
                <div class="col">
                  <label>Login</label>
                  <input type="text" class="form-control" placeholder="Informe o seu login" v-model="loginUser" required>
                </div>

                <div class="col">
                  <label>Senha</label>
                  <input type="password" class="form-control" placeholder="Informe sua senha" v-model="passwordUser" required>
                </div>

                <div class="col">
                  <div class="form-group">
                    <Label for="selectedRole">Selecione um cargo</Label>
                    <select id="selectedRole" class="form-control" v-model="abbreviatedRoleUser">
                      <option disabled value="">Escolha um cargo</option>
                      <option v-for="user in users" v-bind:value="user.abbreviatedRoleUser" :key="user.id">
                        {{ user.role }}
                      </option>
                    </select>
                  </div>
                </div>
                
                <div class="col">

                <div class="form-group">
                  <Label for="selectedStore">Selecione uma rede</Label>
                  <select id="selectedStore" class="form-control" v-model="selected">
                    <option disabled value="">Escolha uma rede</option>
                    <option v-for="option in networks" v-bind:value="option.id" :key="option.id">
                      {{ option.NOME_REDE }}
                    </option>
                  </select>
                  </div>
                </div>

                <div class="col text-center mt-2">
                  <button type="button" class="btn btn-outline-dark" @click="hideNewNetwork()">
                    Fechar
                  </button>
                </div>

                <div class="col text-center mt-2">
                  <button type="button" class="btn btn-success" @click="registerUser()">
                    Cadastrar
                  </button>
                </div>
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
      loginUser: '',
      passwordUser: '',
      abbreviatedRoleUser: '',
      selected: '',
      networks: [],
      users: [
        {
          id: 1,
          role: 'Master',
          abbreviatedRoleUser: 'M'
        },
        {
          id: 2,
          role: 'Administrativo',
          abbreviatedRoleUser: 'A'
        }
      ]
    }
  }, 
  methods: {
    myFunction(){ axios.get("http://localhost:4000/replicacoes", )
      .then(res => {
        this.networks = res.data.networks
      }).catch(err => {
        this.err = err.response.data.err
      })
    },
    async registerUser(){
      if(this.loginUser.trim() == ''){
        alert("O campo login é obrigatório")
      } else{
        if(this.passwordUser.trim() == ''){
          alert("O campo senha é obrigatório")
        } else {
          if(this.abbreviatedRoleUser == ""){
            alert("O campo cargo é obrigatório")
          } else{
            try {
              await axios.post("http://localhost:4000/user", {
                login: this.loginUser,
                password: this.passwordUser,
                role: this.abbreviatedRoleUser,
                networkId: this.selected
              })
              .then(res => {
                this.loginUser = '',
                this.passwordUser = '',
                this.abbreviatedRoleUser = '',
                alert(res.data.success)
              });
            } catch(err) {
              alert(JSON.stringify(err.response.data.err))
            }
          }
        }
      }
    }
  },
  created(){
    this.myFunction();
  }
}
</script>


