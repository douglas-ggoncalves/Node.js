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
                    <a href="replicacao">Replicação</a>
                </li>

                <li>
                    <a href="representante">Representante</a>
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

          <div class="container d-flex justify-content-center">
            <div class="row d-flex justify-content-center">
              <div class="col-12">
                <h3>Representantes</h3>
              </div>

              <div class="col-12">
                <button type="button" class="btn btn-outline-info" data-toggle="modal" data-target="#replication">
                  Novo
                </button>

                <button class="btn btn-outline-dark edit" type="button" id="edit" data-toggle="modal"
                    data-target="#editModal">
                  <i class="fa-solid fa-pencil"></i>
                </button>

                <button class="btn btn-outline-info" @click="reloadPage()">
                    <i class="fa-solid fa-repeat"></i>
                </button>

                <button class="btn btn-outline-dark">
                  <i class="fa-solid fa-sliders"></i>
                </button>
              </div>

              <div class="col d-flex justify-content-center mt-2">
                <hr class="bg-dark w-100 m-1">
              </div>
            </div>
          </div>

          <div v-if="err != undefined">
              <h3>Ocorreu um erro: {{ err }}</h3>
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
            err: undefined
        }
    },

    created(){
        axios.get("http://localhost:4000/searchRepresentative").then(res => {
        console.log(res.data.select)
      }).catch(err => {
          console.log(err)
        //console.log("Ocorreu um erro " + JSON.stringify(err.response.data.err))
        this.err = err.response.data.select
      })
    },
    methods: {
    clique() {
      var X = document.getElementById("sidebar").className;
      if (X == "") {
          document.getElementById("sidebar").className = "active"
        } else {
          document.getElementById("sidebar").className = ""
      }
    }
}
}
</script>

<style scoped>
.wrapper {
    display: flex;
    width: 100%;
    align-items: stretch;
}

#sidebar {
    min-width: 250px;
    max-width: 250px;
    min-height: 100vh;
}

#sidebar.active {
    margin-left: -250px;
}

a[data-toggle="collapse"] {
    position: relative;
}

.dropdown-toggle::after {
    display: block;
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
}

@media (max-width: 768px) {
    #sidebar {
        margin-left: -250px;
    }
    #sidebar.active {
        margin-left: 0;
    }
}

@import "https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700";

body {
    font-family: 'Poppins', sans-serif;
    background: #fafafa;
}

p {
    font-family: 'Poppins', sans-serif;
    font-size: 1.1em;
    font-weight: 300;
    line-height: 1.7em;
    color: #999;
}

a, a:hover, a:focus {
    color: inherit;
    text-decoration: none;
    transition: all 0.3s;
}

#sidebar {
    background: linear-gradient(to bottom, #185992 0%, #31374F 100%);
    color: #fff;
    transition: all 0.3s;
}

#sidebar .sidebar-header {
    padding: 20px;
}

#sidebar ul.components {
    padding: 20px 0;
    border-bottom: 1px solid #47748b;
}

#sidebar ul p {
    color: #fff;
    padding: 10px;
}

#sidebar ul li a {
    padding: 10px;
    font-size: 1.1em;
    display: block;
}
#sidebar ul li a:hover {
    color: #7386D5;
    background: #fff;
}
/*
#sidebar ul li.active > a, a[aria-expanded="true"] {
    color: #fff;
    background: #143450;
}
*/
ul ul a {
    font-size: 0.9em !important;
    padding-left: 30px !important;
    background: #225886;
}

.input-group .form-control{
    border: 0;
}

button.btn.btn-link.aa:not(.collapsed){
    background-color: #e7f1ff;
    color: #0c63e4;
}

button {
  margin: 0  .15rem !important;
}

</style>