<template>
  <div class="page-container">
    <div class="page-side">
      <button class="btn blue side"></button>
    </div>
    <div class="mb-10">
      <div class="flex justify-between">
        <h3 class="text-2xl text-gray-900 font-1 md:text-4xl">
          {{ material.nombre }}
        </h3>
        <div>
          <button class="action-btn" @click="edit">
            <GlobalSvg class="h-5 w-5 md:h-6 md:w-6" svg="pencil" />
          </button>
        </div>
      </div>
      <hr class="mt-3" />
    </div>
    <div class="grid gap-3 lg:grid-cols-2">
      <GlobalInfoTable
        title="Movimientos"
        svg="cube"
        :table="table"
        :open="open.table"
        :count="movimientos.length"
        @click="showDetails()"
      >
        <tr v-for="movimiento in movimientos" :key="movimiento.id">
          <td class="table-td">
            <router-link
              :to="`/inventario/${movimiento.id}`"
              class="text-black hover:text-blue-600 hover:underline"
            >
              {{ movimiento.fecha }}
            </router-link>
          </td>
          <td class="table-td">
            {{ material.accion }}
          </td>
          <td class="table-td text-gray-500">
            {{ material.cantidad }}
          </td>
          <td class="table-td">
            <router-link
              :to="`/depositos/${movimiento.deposito.id}`"
              class="text-black hover:text-blue-600 hover:underline"
            >
              {{ movimiento.deposito }}
            </router-link>
          </td>
        </tr>
      </GlobalInfoTable>
    </div>
    <LazyModal v-if="open.modal">
      <FormDepositoUpdate is-view @close="open.modal = !open.modal" />
    </LazyModal>
  </div>
</template>

<script>
export default {
  layout: 'AppLayout',
  middleware: 'admin',
  data() {
    return {
      open: {
        modal: false,
        table: false,
      },
      table: ['Fecha', 'Acción', 'Cantidad', 'Deposito'],
    };
  },
  computed: {
    material() {
      return (
        this.$store.state.materiales.material ||
        this.$store.dispatch('materiales/get', this.$route.params.id)
      );
    },
    movimientos() {
      return this.$store.state.materiales.movimientos;
    },
  },
  methods: {
    async showDetails() {
      if (!this.movimientos.length) {
        await this.$store.dispatch('materiales/movimientos', this.material.id);
      }
      this.open.table = !this.open.table;
    },
    edit() {
      this.open.modal = !this.open.modal;
    },
  },
};
</script>
