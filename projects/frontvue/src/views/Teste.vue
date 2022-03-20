<template>
    <modal name="example">
        <div class="row" style="heigth: 100vh">
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
                <select id="selectedStore" class="form-control">
                  <option disabled value="">Escolha um item</option>
                  <option>A</option>
                  <option>B</option>
                  <option>C</option>
                </select>
              </div>
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
</template>

<script>
export default {
    mounted () {
        this.$modal.show('example', {
            dynamicDefaults: {
    draggable: true,
    resizable: true,
    height: 'auto'
  }
        })
    }
}
</script>