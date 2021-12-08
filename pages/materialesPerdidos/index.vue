<template>
  <div>
    <GlobalHeader :title="pageHeader.title" :text="pageHeader.text" />
    <div>
      <LazyGlobalSearch
        v-if="materialesAll.length"
        store="materialesPerdidos"
        title="materiales"
        :data="depositos"
        @filtrar="filtrar"
        @limpiar="limpiar"
      />
      <div class="flex flex-col gap-3 lg:flex-row">
        <div class="table-actions">
          <GlobalCallToAction
            text="Agregar <b>materiales</b>."
            svg="cube"
            @click="$router.push('/materiales/agregar')"
          />
          <GlobalCallToAction
            text="Ir a <b>materiales</b>."
            type="view"
            svg="clipboard-list"
            @click="$router.push('/materiales')"
          />
        </div>
        <Table v-if="materialesAll.length">
          <template #head>
            <TableHead :header="table" />
          </template>
          <template #body>
            <tr v-for="material in filtrados" :key="material.id">
              <td class="table-td text-gray-500">
                {{ material.fecha }}
              </td>
              <td class="table-td text-gray-500">
                <router-link
                  :to="`/reservas/${material.reserva_id}`"
                  class="text-black hover:text-blue-600 hover:underline"
                >
                  Ver Reserva
                </router-link>
              </td>
              <td class="table-td text-gray-500">
                <router-link
                  :to="`/depositos/${material.deposito_id}`"
                  class="hover:text-blue-600 hover:underline"
                  @click.native="verDeposito(material.deposito_id)"
                >
                  {{ material.deposito }}
                </router-link>
              </td>
              <td class="table-td text-gray-500">
                <router-link
                  :to="`/perfil/${material.guardia_ci}`"
                  class="hover:text-blue-600 hover:underline"
                >
                  {{ material.guardia }}
                </router-link>
              </td>
              <td class="table-td text-right">
                <TableButton
                  type="view"
                  @click="verMaterialPerdido(material)"
                />
              </td>
            </tr>
          </template>
        </Table>
        <LazyGlobalSinDatos v-else model="materiales" />
        <LazyModal v-if="modal">
          <FormMaterialPerdidosVer @close="modal = !modal" />
        </LazyModal>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'AppLayout',
  middleware: 'admin',
  data() {
    return {
      pageHeader: {
        title: 'Materiales perdidos',
        text: 'Registro de incidentes sobre materiales perdidos / dañados y reservas con problemas.',
      },
      table: ['Fecha', 'Reserva', 'Deposito', 'Guardia'],
      modal: false,
      filtrados: [],
      inputs: [{ value: 'deposito_id', text: 'Deposito' }],
      searchTitle: 'depósito',
    };
  },
  computed: {
    materialesAll() {
      return this.$store.state.materialesPerdidos.materiales;
    },
    depositos() {
      return this.$store.getters['depositos/conMaterialesPerdidos'];
    },
  },
  async mounted() {
    await this.$store.dispatch('materialesPerdidos/all');
    await this.$store.dispatch('depositos/all');
    this.filtrados = this.materialesAll;
  },
  methods: {
    async verDeposito(dep) {
      await this.$store.dispatch('depositos/get', dep);
    },
    async verCategoria(cat) {
      await this.$store.dispatch('categorias/get', cat);
    },
    filtrar() {
      this.materiales = this.filtrados;
    },
    limpiar() {
      this.materiales = this.materialesAll;
    },
    cambiarFiltro(dato) {
      this.materialesFiltradas = dato === 'deposito_id';
      this.searchTitle = dato === 'deposito_id' ? 'depósito' : 'categoría';
      this.limpiar();
    },
    updateFiltrados() {
      this.modal.show = false;
      this.materiales = this.materialesAll;
    },
    verMaterialPerdido(mat) {
      this.$store.dispatch('materialesPerdidos/select', mat);
      this.modal = true;
    },
  },
};
</script>
