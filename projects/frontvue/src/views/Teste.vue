<template>
    <div id="divMain">
      <div id="divTitle">
        <h4>Código de verificação da Maximus</h4>
      </div>
      
      <div id="divData">
        <h6>Prezado nome do cliente aqui</h6>
        <h5>
          Este e-mail foi enviado para ajudar na recuperação de acesso à sua Conta da Maximus:
        </h5>
        <a href="#">Clique aqui para recuperar sua senha</a>

        <h5>
          Se você não solicitou esse código provavelmente outra pessoa esteja tentando acessar a sua <b>conta</b> <strong>douglasrnn63@gmail.com</strong> Não encaminhe ou mostre esse e-mail a ninguém.
        </h5>
      </div>

      <footer>
        <img src="../assets/img/logo_maximus_gestao.png" alt="">
      </footer>
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

<style scoped>
#divMain{
  position: relative;
  width: 50%;
  height: 90vh;
  display: flex;
  align-items: center;
  background-color: rgb(250, 250, 250);
  
}

#divTitle{
  background-color: blue; 
  width: 100%;
  display: block; 
  color: white; 
  padding: 1rem;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}

#divData{
  padding: 0 1rem;
}

h4{
  margin: auto;
}

h5{
  margin-bottom: 1rem;
  margin-top: 1rem;
}

h6{
  font-size: 1.15rem;
}

a{
  font-size: 1.1rem;
  margin-bottom: .5rem;
  margin-top: .5rem;
  color: blue !important; 
  text-decoration: none;
}

footer{
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}

img{
  max-width: 100%;
  height: 150px;
}
</style>