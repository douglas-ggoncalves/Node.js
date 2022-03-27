<template>
  <div>
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

        <div id="content">
            <nav class="navbar navbar-expand-lg navbar-light">
                <div class="container-fluid">
                    <button type="button" id="sidebarCollapse" class="btn btn-outline-dark" @click="clique()">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                </div>
            </nav>
        </div>
    </div>
  </div>
</template>

<script>
import '../assets/style/style.css'
import scrypt from "../assets/js/scrypt";

export default {
    methods: {
        clique() {
            scrypt.clique(this);
        }
    }
}
</script>
