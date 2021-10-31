<template>
  <div>
    <GlobalHeader :title="header.title" :text="header.text" />
    <div class="flex flex-col gap-3 lg:flex-row">
      <Table>
        <template #header>
          <TableHead :header="table.header" :action="false" />
        </template>
        <template #body>
          <tr v-for="movimiento in inventario" :key="movimiento.id">
            <td class="table-td text-gray-500">
              {{ movimiento.fecha }}
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
          </tr>
        </template>
      </Table>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'AppLayout',
  data() {
    return {
      header: {
        title: 'Inventario',
        text: 'Registro de los movimientos de materiales.',
      },
      table: {
        header: ['Fecha', 'Material', 'Cantidad', 'Deposito', 'Acción'],
      },
      acciones: [
        { value: 1, text: 'Alta' },
        { value: 0, text: 'Baja' },
      ],
      modal: {
        show: false,
        action: '',
      },
    };
  },
  computed: {
    inventario() {
      return this.$store.state.inventario.inventario;
    },
  },
  mounted() {
    this.$store.dispatch('inventario/all');
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
</style>
