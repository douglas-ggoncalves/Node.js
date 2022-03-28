<template>
  <div class="home" id="divMainReplic">
    <div class="wrapper">
        <!-- Sidebar -->
        <nav id="sidebar">
            <ul class="list-unstyled components">
                <div class="sidebar-header">
                    <img class="img-fluid" src="../../assets/img/logo-white.png">
                    <hr>
                </div>

                <li v-if="roleUserLogged == 'M' || roleUserLogged == 'A'">
                  <a href="adminUsers">Gestão de Usuários</a>
                </li>

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

          <div class="container">
            <div class="row d-flex justify-content-center align-items-center">
              <div class="col-12">
                <h3>Gestão de Usuários</h3>
              </div>

              <div class="col-12" >
                <button type="button" class="btn btn-outline-dark" @click="showModalNewUser()">
                  Novo usuário
                </button>
              </div>

              <div class="col-12 d-flex justify-content-center mt-2">
                <hr class="bg-dark w-100 m-1">
              </div>

                <div class="form-group">
                    <input type="text" class="form-control" v-model="busca" placeholder="Busca por login do usuário">
                </div>
                
                <table class="table table-hover">
                    <thead>
                        <tr>
                        <th scope="col">Login</th>
                        <th scope="col">Cargo</th>
                        <th scope="col">Rede Usuário</th>
                        <th scope="col">Handle</th>
                        </tr>
                    </thead>

                    <tbody v-for="(client, index) in searchClient" :key="client.ID_USUARIO">
                        <tr>
                            <th scope="row">{{ client.LOGIN_USUARIO }}</th>
                            <td>{{ client.CARGO_USUARIO }}</td>
                            <td>{{ client.NOME_REDE }}</td>
                            <td>
                                <button type="button" class="btn btn-outline-dark" @click="editClient(index)" v-if="roleUserLogged == 'M' || roleUserLogged == 'A'">
                                    <i class="fa-solid fa-pencil"></i>
                                </button>

                                <button class="btn btn-outline-danger" @click="deleteUser(client.ID_USUARIO, client.LOGIN_USUARIO)">
                                    <i class="fa-solid fa-trash-can"></i>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
          </div>
        </div>
    </div>

    <modal name="modalNewUser" id="modalStore">
        <div class="container">
            <div class="row">
                <div class="card">
                    <h4 class="card-header">Cadastrar Usuário</h4>
                    <div class="card-body">
                        <div class="col">
                            <label>Login</label>
                            <input type="text" class="form-control" placeholder="Informe o login" v-model="loginUser" required>
                        </div>

                        <div class="col">
                            <label>Senha</label>
                            <input type="password" class="form-control" placeholder="Informe a senha" v-model="passwordUser" required>
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
    </modal>

    <modal name="modalEditUser" id="modalStoreEdit">
      <div class="row">
        <div class="card">
          <h4 class="card-header">Editar Usuário</h4>
          <div class="card-body">
            <div class="col">
              <div class="form-group">
                <Label for="loginUser">Login do Usuário</Label>
                <input type="text" id="loginUser" class="form-control" v-model="editLoginUser" required>
              </div>
            </div>

            <div class="col">
                <div class="form-group">
                    <Label for="selectedRole">Selecione um cargo</Label>
                    <select id="selectedRole" class="form-control" v-model="editRoleUser">
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
                     <select id="selectedStore" class="form-control" v-model="editRoleNetwork">
                        <option disabled value="">Escolha uma rede</option>
                        <option v-for="option in networks" v-bind:value="option.id" :key="option.id">
                            {{ option.NOME_REDE }}
                        </option>
                    </select>
                </div>
            </div>

            <div class="col text-center mt-2">
              <button type="button" class="btn btn-success" @click="editStore()">
                Editar Usuário
              </button>
            </div>

          </div>
        </div>
      </div>
    </modal>
</div>

    
</template>

<script>
import VModal from 'vue-js-modal'
import axios from 'axios';
import '../../assets/style/style.css'
import scrypt from "../../assets/js/scrypt";
import Vue from 'vue'
import Multiselect from 'vue-multiselect'

Vue.component('multiselect', Multiselect)

Vue.use(VModal, {
  dynamicDefaults: {height: 'auto'} 
})

export default {
    data(){
        return{
            clients: [],
            busca: '',
            loginUser: '',
            passwordUser: '',
            abbreviatedRoleUser: '',
            selected: '',
            networks: [],
            editLoginUser: '',
            editRoleUser:'',
            editRoleNetwork:'',
            roleUserLogged: '',
            redeIdUserLogged: '',
            idUser: '',
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
        myFunction(){
            axios.get("http://localhost:4000/users", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }   
            })
            .then(res => {
                this.roleUserLogged = localStorage.getItem("roleUser")
                this.redeIdUserLogged = localStorage.getItem("redeIdUser")
                if(this.redeIdUserLogged != 'null') {
                    this.redeIdUserLogged = localStorage.getItem("redeIdUser")
                    this.clients = res.data.filter(r => r.REDEID_USUARIO == this.redeIdUserLogged)
                } else{
                    this.clients = res.data
                }
            }).catch(err => {
                alert(err.response.data)
            })
        },
        myFunction2(){
            axios.get("http://localhost:4000/replicacoes", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            })
            .then(res => {
                this.roleUserLogged = localStorage.getItem("roleUser")
                if(this.redeIdUserLogged != 'null') {
                    this.redeIdUserLogged = localStorage.getItem("redeIdUser")
                    this.networks = res.data.networks.filter(r => r.id == this.redeIdUserLogged)
                } else{
                    this.networks = res.data.networks
                }
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
                                this.abbreviatedRoleUser = ''
                                this.clients = '';
                                this.myFunction();
                                alert(res.data.success)
                                //document.location.reload(true);
                            });
                            } catch(err) {
                                alert(JSON.stringify(err.response.data.err))
                                console.log(err.response)
                            }
                    }
                }
            }
        },
        async deleteUser(id, login){
            var confirmation = await confirm("Deseja excluir " + login + ' ?');
            if(confirmation) {
                //alert("confirmou, bora deletar o usuário de id " + id)
                try {
                    await axios.delete(`http://localhost:4000/user/${login}`)
                    .then(res => {
                        this.clients = this.clients.filter(client => client.LOGIN_USUARIO != login)
                        alert(res.data.success)

                    });
                    } catch(err) {
                        alert(JSON.stringify(err.response.data.err))
                    }
            }
        },
        editClient(indexClient){
            this.editLoginUser = this.clients[indexClient].LOGIN_USUARIO
            this.editRoleUser = this.clients[indexClient].CARGO_USUARIO
            this.editRoleNetwork = this.clients[indexClient].REDEID_USUARIO
            this.idUser = this.clients[indexClient].ID_USUARIO
            this.$modal.show('modalEditUser');
        },
        async editStore() {
            if(this.editLoginUser.trim() == "" || this.editRoleUser.trim() == "") {
                alert("Todos os dados devem ser preenchidos")
            } else {
                var confirmation = await confirm("Confirma a alteração de dados ?");
                if(confirmation){
                    try {
                        await axios.patch("http://localhost:4000/user", {
                        editLoginUser: this.editLoginUser,
                        editRoleUser: this.editRoleUser,
                        editRoleNetwork: this.editRoleNetwork,
                        idUser: this.idUser
                        })
                        .then(res => {
                            this.clients = '';
                            this.myFunction();
                            alert(res.data.success)
                        });
                    } catch(err) {
                        alert(JSON.stringify(err.response.data.err))
                    }
                }
            }
        },
        clique() {
            scrypt.clique(this);
        },
        showModalNewUser () {
            this.$modal.show('modalNewUser');
        },
        hideModalEditUser () {
            this.$modal.show('modalEditUser');
        }
    },
    created(){
        this.myFunction();
        this.myFunction2();
    },
    computed: {
        searchClient: function(){
            if(this.busca.trim() == ''){
                return this.clients;
            } else{
                return this.clients.filter(client => client.LOGIN_USUARIO.toLowerCase().match(this.busca.toLowerCase()));
            }
        }
    }
}
</script>
