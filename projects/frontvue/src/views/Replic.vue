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

          <div class="container ">
            <div class="row d-flex justify-content-center align-items-center">
              <div class="col-12">
                <h3>Replicações</h3>
              </div>

              <div class="col-12">
                <button type="button" class="btn btn-outline-dark" @click="showNewNetwork()">
                  Nova Rede
                </button>

                <button type="button" class="btn btn-outline-dark" @click="showNewStore()">
                  Nova Loja
                </button>

                <button class="btn btn-outline-success" type="button" @click="initVerify()">
                  Iniciar verificação
                </button>

                <button class="btn btn-outline-success" type="button" @click="showFilterStores()">
                  Filtrar Lojas
                </button>

                <button class="btn btn-outline-dark edit" type="button" id="edit" data-toggle="modal"
                    data-target="#editModal">
                  <i class="fa-solid fa-pencil"></i>
                </button>

                <button class="btn btn-outline-dark" @click="reloadPage()">
                    <i class="fa-solid fa-repeat"></i>
                </button>
              </div>

              <div class="col d-flex justify-content-center mt-2">
                <hr class="bg-dark w-100 m-1">
              </div>
            </div>
          </div>

          <div class="card" style="width: 100%; border: none;">
            <div v-if="err">
              <h3>{{ err }}</h3>
            </div>

            <div v-else>
              <table class="table table-bordered mt-3">
                <thead>
                  <tr>
                    <th scope="col">Número Da Loja Origem</th>
                    <th scope="col">Comandos</th>
                    <th scope="col">Ações</th>
                  </tr>
                </thead>

                <tbody v-for="(poke, index) in data" :key="index">
                  <tr v-if="data[index].err">
                    <td>{{ data[index].newArray.NOME_REDE }} {{ data[index].newArray.NUMERO_LOJA }}</td>
                    <td>{{ data[index].err }} na loja {{ data[index].newArray.NUMERO_LOJA }}</td>
                  </tr>

                 <tr v-else>
                    <td>{{ data[index].NOME_REDE }} {{ data[index].NUMERO_LOJA }}</td>
                    <td>
                      <div v-for="(arr, id) in data[index].result" :key="id">
                        Loja Destino: {{ data[index].result[id].IDLojaDestino }} - Quantidade de Comandos: {{ data[index].result[id].QuantidadesDeComandos }}
                      </div>
                    </td>

                    <td>@mdo</td>
                  </tr>
                  
                </tbody>
              </table>
              
            </div>
          </div>
        </div>
    </div>

    <modal name="modalNetwork">
      <div class="row">
        <div class="card">
          <h4 class="card-header">Cadastrar Rede</h4>
          <div class="card-body">
              <div class="col">
                  <label>Nome Da Rede</label>
                  <input type="text" class="form-control" placeholder="Digite o nome da rede" v-model="network" required>
              </div>

              <div class="col text-center mt-2">
                <button type="button" class="btn btn-outline-dark" @click="hideNewNetwork()">
                  Fechar
                </button>
              </div>

              <div class="col text-center mt-2">
                  <button type="button" class="btn btn-success" @click="registerNetwork()">
                    Cadastrar
                  </button>
              </div>
          </div>
        </div>
      </div>
    </modal>

    <modal name="modalStore" id="modalStore">
      <div class="row">
        <div class="card">
          <h4 class="card-header">Cadastrar Loja</h4>
          <div class="card-body">
              <div class="col">
              <div class="form-group">
                <Label for="storeNumber">Número da loja</Label>
                <input type="number" class="form-control" placeholder="Informe o número da loja" v-model="numberStoreNewStore" @change="updateStoreName()" required>
              </div>
            </div>

            <div class="col">
              <div class="form-group">
                <Label for="storeName">Nome da loja</Label>
                <input type="text" class="form-control" placeholder="Informe o nome da loja" v-model="nameStore" required>
              </div>
            </div>

            <div class="col">
              <div class="form-group">
                <Label for="storeIP">IP da loja</Label>
                <input type="text" class="form-control" placeholder="Informe o IP da loja" v-model="ipStore" required>
              </div>
            </div>

            <div class="col">
              <div class="form-group">
                <Label for="selectedStore">Selecione uma rede</Label>
                <select id="selectedStore" class="form-control" v-model="selected">
                  <option disabled value="">Escolha um item</option>
                  <option v-for="option in arrays.networks[0]" v-bind:value="option.NOME_REDE" :key="option.id">
                    {{ option.NOME_REDE }}
                  </option>
                </select>
              </div>
            </div>

            <div class="col">
              <div class="form-group">
                <Label for="doorIP">Porta referente ao IP</Label>
                <input type="text" id="doorIP" class="form-control" v-model="doorIP" placeholder="Informe a porta da loja" required readonly>
              </div>
            </div>
      
            <div class="col">
              <div class="form-group">
                <Label for="login">Login do banco</Label>
                <input type="text" id="login" class="form-control" v-model="login" placeholder="Informe o login do banco" required readonly>
              </div>
            </div>

            <div class="col">
              <div class="form-group">
                <Label for="password">Senha do banco</Label>
                <input type="text" id="passwordBank" class="form-control" v-model="password" value="d120588$788455" placeholder="Informe a senha do banco" required readonly>
              </div>
            </div>

            <div class="col mt-2">
              <div class="text-center">
                <button type="button" class="btn btn-outline-danger" @click="defaults()">
                  Alterar valores padrões
                </button>
              </div>
            </div>

            <div class="col text-center mt-1">
                <button type="button" class="btn btn-success" @click="registerStore()">
                  Cadastrar Loja
                </button>
            </div>
          </div>
        </div>
      </div>
    </modal>

    <modal name="modalFilterStores">
      <div class="row">
        <div class="card">
          <h4 class="card-header">Cadastrar Loja</h4>
          <div class="card-body">
              <div class="col">
                  <label>Nome Da Rede</label>
                  <input type="text" class="form-control" placeholder="Digite o nome da rede" v-model="network" required>
              </div>

              <div class="col text-center mt-2">
                  <button type="button" class="btn btn-success" @click="registerNetwork()">
                    Cadastrar Loja
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
import Vue from 'vue'
import '../assets/style/style.css'
import scrypt from "../assets/js/scrypt";

Vue.use(VModal, {
  dynamicDefaults: {height: 'auto'} 
})

export default {
  created(){
    this.myFunction();
  },
  data() {
    return {
      numberStoreNewStore: '',
      nameStore: '',
      ipStore: '',
      network: '',
      selected: '',
      login: 'sa',
      doorIP: '3739',
      password: 'd120588$788455',
      err: undefined,
      data: [],
      arrays: 
        {
          networks: [],
          lojas: []
        }
    }
  },
  methods: {
    myFunction(){ axios.get("http://localhost:4000/replicacoes", )
      .then(res => {
        this.arrays.networks.push(res.data.networks)
        this.arrays.lojas.push(res.data.stores)

        console.log(JSON.stringify(res.data.networks))

        for (var x=0;  x < this.arrays.networks[0].length; x++) {
          for(var i=0; i < this.arrays.lojas[0].length; i++ ){
            if(x+1 == this.arrays.lojas[0][i].id){
              if(this.arrays.lojas[0][i] != undefined){
                this.data.push(this.arrays.lojas[0][i]);
                //this.data.push("asdasdasdas");
                //Vue.set(this.data.lojas[0], i, ["zzzzzz"])
              }
            }
          }
        }
        this.initVerify()
      }).catch(err => {
        console.log("Ocorreu um erro " +err.response.data.err)
        this.err = err.response.data.err
      })
    }, 
    async initVerify(){
        for(var y=0; y < this.data.length; y++) {
          try {
            await axios.post("http://localhost:4000/replicacoes", {array: this.data[y]})
            .then(res => {
              Vue.set(this.data, y, res.data.newArray)
            });
          } catch(err) {
            Vue.set(this.data, y, err.response.data)
            console.log(err.response)
          }
        }
    }, 
    async registerNetwork(){
      if(this.network.trim() == ""){
        alert("Nome da rede não pode ser vazio")
      } else{
        var confirmation = await confirm("Deseja cadastrar a rede com o nome " + this.network +' ?');

        if(confirmation) {
          console.log(confirmation)
          try {
            await axios.post("http://localhost:4000/redes", {
              network: this.network
            })
            .then(res => {
              this.network = '';
              alert(res.data.success)
            });
          } catch(err) {
            alert(JSON.stringify(err.response.data.err))
            console.log(err.response)
          }
        }
      }
      //console.log("Chegou " + this.network)
    },
    async registerStore() {
      if(this.numberStoreNewStore.trim() == "" 
        || this.nameStore.trim() == ""
        || this.ipStore.trim() == ""
        || this.selected.trim() == ""
        || this.doorIP.trim() == ""
        || this.login.trim() == ""
        || this.password.trim() == ""
      )
      {
        alert("Todos os dados devem ser preenchidos")
      } else {
        alert("Vamos cadastrar")
      }
    },
    clique() {
      scrypt.clique(this);
    },
    reloadPage() {
      window.location.reload(true);
    },
    showNewNetwork () {
      this.$modal.show('modalNetwork');
    },
    hideNewNetwork () {
      this.$modal.hide('modalNetwork');
    }, 
    showFilterStores(){
      this.$modal.show('modalFilterStores');
    },
    showNewStore(){
      this.$modal.show('modalStore');
    },
    updateStoreName(){
      if(this.numberStoreNewStore == '0'){
        this.nameStore = 'Integração';
      } else if(this.numberStoreNewStore > 0) {
        this.nameStore = 'Loja ' + this.numberStoreNewStore;
      } 
       else if(this.numberStoreNewStore < 0){
        this.nameStore = 'Número da loja inválido'
      }
    }, 
    defaults() {
      document.getElementById("login").removeAttribute("readonly");
      document.getElementById("doorIP").removeAttribute("readonly");
      document.getElementById("passwordBank").removeAttribute("readonly");
    }
  }/*, 
  mount () {
    this.showNewNetwork()
  }*/
}
</script> 


<style scoped>
.row {
  height: 100%;
}

.card {
  border: none !important;
}

div.card-body{
  margin-bottom: auto;
  margin-top: auto;
  text-align: left !important;
}

button {
  margin-top: auto;
}
</style>