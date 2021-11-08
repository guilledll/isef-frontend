<template>
  <div>
    <GlobalHeader :title="header.title" :text="header.text" />
    <div class="flex flex-col gap-3 lg:flex-row">
      <Table>
        <template #head>
          <TableHead :header="table.header" :action="false" />
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
            <td class="table-td" :class="claseAccion(movimiento.accion)">
              {{ mostrarAccion(movimiento.accion) }}
            </td>

            <td class="table-td nota" @click="verMovimiento(movimiento)">
              <GlobalSvg class="h-5 w-5 m-auto" svg="info-circle" />
            </td>
          </tr>
        </template>
      </Table>
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
      table: {
        header: [
          'Fecha',
          'Encargado',
          'Material',
          'Cantidad',
          'Depósito',
          'Acción',
          'Detalles',
        ],
      },
      modal: false,
    };
  },
  computed: {
    movimientos() {
      return this.$store.state.inventario.inventario;
    },
  },
  async mounted() {
    await this.$store.dispatch('inventario/all');
  },
  methods: {
    claseAccion(accion) {
      return `accion-${accion}`;
    },
    mostrarAccion(accion) {
      switch (parseInt(accion)) {
        case 0:
          accion = 'Baja';
          break;
        case 1:
          accion = 'Alta';
      }
      return accion;
    },
    verMovimiento(inv) {
      this.$store.dispatch('inventario/select', inv);
      this.modal = true;
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
