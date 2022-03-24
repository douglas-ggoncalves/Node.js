<template>
  <div class="home" id="divMainReplic">
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

          <div class="container">
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

                <button class="btn btn-outline-dark edit" type="button" id="edit" data-toggle="modal"
                    data-target="#editModal">
                  <i class="fa-solid fa-pencil"></i>
                </button>

                <button class="btn btn-outline-dark" @click="reloadPage()">
                  <i class="fa-solid fa-repeat"></i>
                </button>
              </div>

              <div class="col-md-6 mt-2">
                <label class="typo__label">Simple select / dropdown</label>
                <multiselect v-model="value" :options="options" :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Filtrar redes" label="name" track-by="name" :preselect-first="false">
                  <template slot="selection" slot-scope="{ values, isOpen }"><span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} redes selecionadas</span></template>
                </multiselect>
              <!-- <pre class="language-json"><code>{{ value  }}</code></pre> -->
              </div>

              <div class="col-md-6 mt-2">
                <label class="typo__label">Simple select / dropdown</label>
                <multiselect v-model="value" :options="networks" :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Filtrar redes" label="NOME_REDE" track-by="NOME_REDE" :preselect-first="false">
                  <template slot="selection" slot-scope="{ values, isOpen }"><span class="multiselect__single" v-if="values.length &amp;&amp; !isOpen">{{ values.length }} redes selecionadas</span></template>
                </multiselect>
              <!-- <pre class="language-json"><code>{{ value  }}</code></pre> -->
              </div>

              <div class="col-12 d-flex justify-content-center mt-2">
                <hr class="bg-dark w-100 m-1">
              </div>
            </div>
          </div>

          <div class="card" style="width: 100%;">
            <div v-if="err">
              <h3>{{ err }}</h3>
            </div>

            <div v-else v-for="network in networks" :key="network.id">
              <table class="table table-bordered table-dark" v-if="network.ativo == 1">
                <thead>
                  <tr>
                    <th scope="col">{{ network.ativo }}</th>
                    <th scope="col" style="width: 60%">{{ network.NOME_REDE }}</th>
                    <th scope="col"></th>
                  </tr>

                  <tr>
                    <th scope="col">Loja Origem</th>
                    <th scope="col" style="width: 60%">Comandos Pendentes</th>
                    <th scope="col">Ações</th>
                  </tr>
                </thead>
                
                <tbody v-for="(poke, index) in data" :key="index">
                  <tr v-if="poke.err" v-show="network.id == poke.REDEID">
                    <td>{{ poke.NOME_LOJA }}</td>
                    <td>{{ poke.err }} com a loja {{ poke.NUMERO_LOJA }}</td>
                    <td>
                      <button type="button" class="btn btn-outline-light" @click="example(poke.ID_LOJA)">
                        <i class="fa-solid fa-screwdriver-wrench"></i>
                      </button>
                    </td>
                  </tr>

                 <tr v-if="!poke.err" v-show="network.id == poke.REDEID">
                    <td>{{ poke.NOME_LOJA }}</td>
                    <td>
                      <div v-for="(arr, id) in data[index].result" :key="id">
                        <span v-if="!data[index].result[id].semComandos">
                          Loja Destino: {{ data[index].result[id].IDLojaDestino }} - Quantidade de Comandos: {{ data[index].result[id].QuantidadesDeComandos }}
                        </span>

                        <span v-else>
                          Não existem comandos pendentes
                        </span>
                      </div>
                    </td>
                    <td>
                      <button type="button" class="btn btn-outline-light" @click="example(data[index].ID_LOJA)">
                        <i class="fa-solid fa-screwdriver-wrench"></i>
                      </button>
                    </td>
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
                  <option disabled value="">Escolha uma rede</option>
                  <option v-for="option in networks" v-bind:value="option.id" :key="option.id">
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

    <modal name="MyComponent" id="modalStoreEdit">
      <div class="row">
        <div class="card">
          <h4 class="card-header">Editar Loja</h4>
          <div class="card-body">
              <div class="col">
              <div class="form-group">
                <Label for="storeNumber">Número da loja</Label>
                <input type="number" class="form-control" placeholder="Informe o número da loja" v-model="editNumberStoreNewStore" @change="editUpdateStoreName()" required>
              </div>
            </div>

            <div class="col">
              <div class="form-group">
                <Label for="storeName">Nome da loja</Label>
                <input type="text" class="form-control" placeholder="Informe o nome da loja" v-model="editNameStore" required>
              </div>
            </div>

            <div class="col">
              <div class="form-group">
                <Label for="storeIP">IP da loja</Label>
                <input type="text" class="form-control" placeholder="Informe o IP da loja" v-model="editIpStore" required>
              </div>
            </div>

            <div class="col">
              <div class="form-group">
                <Label for="selectedStore">Selecione uma rede</Label>
                <select id="selectedStore" class="form-control" v-model="editSelected">
                  <option disabled value="">Escolha uma rede</option>
                  <option v-for="option in networks" v-bind:value="option.id" :key="option.id">
                    {{ option.NOME_REDE }}
                  </option>
                </select>
              </div>
            </div>

            <div class="col">
              <div class="form-group">
                <Label for="doorIP">Porta referente ao IP</Label>
                <input type="text" id="doorIP" class="form-control" v-model="editDoorIP" placeholder="Informe a porta da loja" required>
              </div>
            </div>
      
            <div class="col">
              <div class="form-group">
                <Label for="login">Login do banco</Label>
                <input type="text" id="login" class="form-control" v-model="editLogin" placeholder="Informe o login do banco" required>
              </div>
            </div>

            <div class="col text-center mt-2">
              <button type="button" class="btn btn-primary" @click="editStore()">
                Editar Loja
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
import Multiselect from 'vue-multiselect'

Vue.component('multiselect', Multiselect)

Vue.use(VModal, {
  dynamicDefaults: {height: 'auto'} 
})

export default {
  created(){
    this.myFunction();
  },
  data() {
    return {
      value: [],
      options: [
          { name: 'Vue.js', language: 'JavaScript' },
          { name: 'Adonis', language: 'JavaScript' },
          { name: 'Rails', language: 'Ruby' },
          { name: 'Sinatra', language: 'Ruby' },
          { name: 'Laravel', language: 'PHP' },
          { name: 'Phoenix', language: 'Elixir' }
        ],
      
      numberStoreNewStore: '',
      nameStore: '',
      ipStore: '',
      network: '',
      selected: '',
      login: 'sa',
      doorIP: '3739',
      password: 'd120588$788455',
      buttonIdClicked: '',
      editNumberStoreNewStore: '',
      editNameStore: '',
      editIpStore: '',
      editSelected: '',
      editDoorIP: '',
      editLogin: '',
      selectNetwork: '',
      err: undefined,
      data: [],
      networks: [],
      lojas: []
    }
  },
  methods: {
    myFunction(){ axios.get("http://localhost:4000/replicacoes", )
      .then(res => {
        this.networks = res.data.networks
        this.lojas = res.data.stores
        console.log(JSON.stringify(this.teste))
        console.log(JSON.stringify(this.networks))

        for (var x=0;  x < this.networks.length; x++) {
          if(this.networks[x].ativo == '1'){
            for(var i=0; i < this.lojas.length; i++ ){
              if(x+1 == this.lojas[i].id){
                if(this.lojas[i] != undefined){
                  this.data.push(this.lojas[i]);
                }
              }
            }
          }
        }

        this.initVerify()
      }).catch(err => {
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
            Vue.set(this.data, y, err.response.data.newArray)
          }
        }
    }, 
    async registerNetwork(){
      if(this.network.trim() == ""){
        alert("Nome da rede não pode ser vazio")
      } else{
        var confirmation = await confirm("Deseja cadastrar a rede com o nome " + this.network +' ?');

        if(confirmation) {
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
          }
        }
      }
      //console.log("Chegou " + this.network)
    },
    async registerStore() {
      if(this.numberStoreNewStore.trim() == "" 
        || this.nameStore.trim() == ""
        || this.ipStore.trim() == ""
        || this.selected == ""
        || this.doorIP.trim() == ""
        || this.login.trim() == ""
        || this.password.trim() == ""
      )
      {
        alert("Todos os dados devem ser preenchidos")
      } else {
        var confirmation = await confirm("Confirma a criação desta loja ?");
        if(confirmation){
          try {
            await axios.post("http://localhost:4000/lojas", {
              numberStoreNewStore: this.numberStoreNewStore,
              nameStore: this.nameStore,
              ipStore: this.ipStore,
              selected: this.selected,
              doorIP: this.doorIP,
              login: this.login,
              password: this.password
            })
            .then(res => {
              this.numberStoreNewStore = '',
              this.nameStore = '',
              this.ipStore = '',
              this.selected = '',
              this.doorIP = '3739',
              this.login = 'sa',
              this.password = 'd120588$788455'
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
    async reloadPage() {
      window.location.reload(true);
    },
    showNewNetwork () {
      this.$modal.show('modalNetwork');
    },
    hideNewNetwork () {
      this.$modal.hide('modalNetwork');
    },
    showNewStore(){
      this.$modal.show('modalStore');
    },
    example(message){
      this.buttonIdClicked = message - 1

      this.editNumberStoreNewStore = this.data[this.buttonIdClicked].NUMERO_LOJA.toString()
      this.editNameStore = this.data[this.buttonIdClicked].NOME_LOJA
      this.editIpStore = this.data[this.buttonIdClicked].IP_LOJA
      this.editSelected = this.data[this.buttonIdClicked].REDEID
      this.editDoorIP = this.data[this.buttonIdClicked].PORTA_LOJA
      this.editLogin = this.data[this.buttonIdClicked].LOGIN_LOJA
      this.$modal.show('MyComponent');
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
    editUpdateStoreName(){
      if(this.editNumberStoreNewStore == '0'){
        this.editNameStore = 'Integração';
      } else if(this.editNumberStoreNewStore > 0) {
        this.editNameStore = 'Loja ' + this.editNumberStoreNewStore;
      } 
       else if(this.editNumberStoreNewStore < 0){
        this.editNameStore = 'Número da loja inválido'
      }
    }, 
    defaults() {
      document.getElementById("login").removeAttribute("readonly");
      document.getElementById("doorIP").removeAttribute("readonly");
      document.getElementById("passwordBank").removeAttribute("readonly");
    },
    async editStore() {
      if(this.editNameStore.trim() == ""
        || this.editIpStore.trim() == ""
        || this.editSelected == ""
        || this.editLogin.trim() == ""
      )
      {
        alert("Todos os dados devem ser preenchidos")
      } else if(this.editNumberStoreNewStore < 0||  this.editDoorIP.length < 4){
        alert("Número da loja ou ip da loja estão incorretos")
      }  else {
        var confirmation = await confirm("Confirma a alteração de dados ?");
        if(confirmation){
          try {
            await axios.patch("http://localhost:4000/lojas", {
              editNumberStoreNewStore: this.editNumberStoreNewStore,
              editNameStore: this.editNameStore,
              editIpStore: this.editIpStore,
              editSelected: this.editSelected,
              editDoorIP: this.editDoorIP,
              editLogin: this.editLogin,
              idStore: this.buttonIdClicked
            })
            .then(res => {
              this.editNumberStoreNewStore = '',
              this.editNameStore = '',
              this.editIpStore = '',
              this.editSelected = '',
              this.editDoorIP = '',
              this.editLogin = ''
              alert(res.data.success)
            });
          } catch(err) {
            alert(JSON.stringify(err.response.data.err))
          }
        }
      }
    
    }
  }/*, 
  mount () {
    this.showNewNetwork()
  }*/
}
</script> 

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

<style scoped>

</style>