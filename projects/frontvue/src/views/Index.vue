<template>
  <div>
      <div class="wrapper">
        <!-- Sidebar -->
        <nav id="sidebar">
            <ul class="list-unstyled components">
                <div class="sidebar-header">
                    <img class="img-fluid" src="/img/logo-white.png">
                    <hr>
                </div>
                <li class="active">
                    <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false"
                        class="dropdown-toggle">Default</a>
                    <ul class="collapse list-unstyled" id="homeSubmenu">
                        <li>
                            <a href="#">Atendimento</a>
                        </li>
                        <li>
                            <a href="#">Cidade</a>
                        </li>
                        <li>
                            <a href="#">Estado</a>
                        </li>
                        <li>
                            <a href="#">Agenda de Eventos</a>
                        </li>
                        <li>
                            <a href="#">Loja</a>
                        </li>
                        <li>
                            <a href="#">Módulo</a>
                        </li>
                        <li>
                            <a href="#">Meus Detalhes</a>
                        </li>
                        <li>
                            <a href="#">Usuário</a>
                        </li>
                        <li>
                            <a href="#">Rede</a>
                        </li>
                        <li>
                            <a href="replicacao">Replicação</a>
                        </li>
                        <li>
                            <a href="representante">Representante</a>
                        </li>
                        <li>
                            <a href="#">Requisições ao Programador</a>
                        </li>
                        <li>
                            <a href="#">Título Atendimento</a>
                        </li>
                    </ul>
                </li>

                <li>
                    <a href="#pageSubmenu" data-toggle="collapse" aria-expanded="false"
                        class="dropdown-toggle">Relatórios</a>
                    <ul class="collapse list-unstyled" id="pageSubmenu">
                        <li>
                            <a href="#">Análises</a>
                        </li>
                        <li>
                            <a href="#">Dashboards</a>
                        </li>
                        <li>
                            <a href="#">Relatórios</a>
                        </li>
                    </ul>
                </li>
                <li>
                    <a href="#">Portfolio</a>
                </li>
                <li>
                    <a href="#">Sobre</a>
                </li>
                <form >
                    <li>
                        <a href="logout">Sair</a>
                    </li>
                </form>
            </ul>
        </nav>

        <div id="content">
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <div class="container-fluid">
                    <button type="button" id="sidebarCollapse" class="btn btn-outline-dark" onclick="clique()">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                </div>
            </nav>
        </div>
    </div>
  </div>
</template>

<script>
export default {

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

</style>