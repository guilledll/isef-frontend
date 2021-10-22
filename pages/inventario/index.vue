<template>
  <div>
    <GlobalHeader :title="header.title" :text="header.text" />
    <div class="flex flex-col gap-3 lg:flex-row">
      <Table>
        <template #header>
          <TableHead :header="table.header" />
        </template>
        <template #body>
          <tr v-for="movimiento in inventario" :key="movimiento.id">
            <td class="table-td">
              <router-link
                :to="`/inventario/${movimiento.id}`"
                class="text-black hover:text-blue-600 hover:underline"
                @click.native="seleccionarMovimiento('view', movimiento)"
              >
                {{ movimiento.material }}
              </router-link>
            </td>
            <td class="table-td text-gray-500">
              {{ movimiento.accion || 0 }}
            </td>
            <td class="table-td text-gray-500">
              {{ movimiento.cantidad || 0 }}
            </td>
            <td class="table-td text-gray-500">
              {{ movimiento.fecha }}
            </td>
            <td class="table-td text-right"></td>
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
        header: ['Material', 'Acción', 'Cantidad', 'Fecha'],
      },
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
    this.$store.dispatch('inventario/getAll');
  },
  methods: {
    seleccionarMovimiento(action, movimiento = null) {
      if (movimiento) this.$store.dispatch('inventario/select', movimiento);
      if (action != 'view') {
        this.modal.action = action;
        this.modal.show = !this.modal.show;
      }
    },
  },
};
</script>
