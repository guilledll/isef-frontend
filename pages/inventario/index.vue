<template>
  <div>
    <GlobalHeader :title="header.title" :text="header.text" />
    <GlobalSearch
      :data="depositos"
      title="depósito"
      store="inventario"
      @filtrar="filtrar"
      @limpiar="limpiar"
    />
    <div class="flex flex-col gap-3 lg:flex-row">
      <Table v-if="movimientos.length">
        <template #head>
          <TableHead :header="table" :action="false" />
        </template>
        <template #body>
          <tr v-for="movimiento in movimientos" :key="movimiento.id">
            <td class="table-td text-gray-500">
              {{ movimiento.fecha }}
            </td>
            <td class="table-td">
              <router-link
                :to="`/usuarios/${movimiento.user_ci}`"
                class="hover:text-blue-600 hover:underline"
              >
                {{ movimiento.user_ci }}
              </router-link>
            </td>
            <td class="table-td">
              <router-link
                :to="`/materiales/${movimiento.material_id}`"
                class="text-black hover:text-blue-600 hover:underline"
              >
                {{ movimiento.material }}
              </router-link>
            </td>
            <td class="table-td text-gray-500">
              {{ movimiento.cantidad || 0 }}
            </td>
            <td class="table-td text-gray-500">
              <router-link
                :to="`/depositos/${movimiento.deposito_id}`"
                class="hover:text-blue-600 hover:underline"
              >
                {{ movimiento.deposito }}
              </router-link>
            </td>
            <td class="table-td" :class="`accion-${movimiento.accion}`">
              {{ mostrarAccion(movimiento.accion) }}
            </td>
            <td class="table-td nota" @click="verMovimiento(movimiento)">
              <GlobalSvg class="h-5 w-5 m-auto" svg="info-circle" />
            </td>
          </tr>
        </template>
      </Table>
      <div v-else class="flex flex-col lg:flex-grow">
        <img
          src="/svg/empty.svg"
          alt="No hay categorias"
          class="h-40 my-8 m-auto md:h-52 md:my-16"
        />
      </div>
    </div>
    <LazyModal v-if="modal">
      <InventarioVer @close="modal = !modal" />
    </LazyModal>
  </div>
</template>

<script>
export default {
  layout: 'AppLayout',
  data() {
    return {
      header: {
        title: 'Inventario',
        text: 'Registro de entrada y salida de materiales en todos los depósitos.',
      },
      table: [
        'Fecha',
        'Encargado',
        'Material',
        'Cantidad',
        'Depósito',
        'Acción',
        'Detalles',
      ],
      modal: false,
      movimientos: [],
    };
  },
  computed: {
    movimientosAll() {
      return this.$store.state.inventario.inventario;
    },
    filtrados() {
      return this.$store.state.inventario.filtrados;
    },
    depositos() {
      return this.$store.getters['depositos/conMateriales'];
    },
  },
  async mounted() {
    await this.$store.dispatch('inventario/all');
    this.movimientos = this.movimientosAll;
    await this.$store.dispatch('depositos/all');
  },
  methods: {
    mostrarAccion(accion) {
      switch (parseInt(accion)) {
        case 0:
          accion = 'Baja';
          break;
        case 1:
          accion = 'Alta';
          break;
        case 2:
          accion = 'Movimiento';
          break;
      }
      return accion;
    },
    verMovimiento(inv) {
      this.$store.dispatch('inventario/select', inv);
      this.modal = true;
    },
    filtrar() {
      this.movimientos = this.filtrados;
    },
    limpiar() {
      this.movimientos = this.movimientosAll;
    },
  },
};
</script>

<style lang="postcss" scoped>
.accion-0 {
  @apply text-red-500;
}
.accion-1 {
  @apply text-green-500;
}
.nota {
  @apply text-center text-gray-500 cursor-pointer hover:text-blue-500 hover:bg-blue-50;
}
</style>
