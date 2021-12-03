<template>
  <div class="page-container">
    <div class="mb-10">
      <div class="flex justify-between">
        <h3 class="text-2xl text-gray-900 font-1 md:text-4xl">
          {{ material.nombre }} {{ material.categoria }}
        </h3>
        <div>
          <button class="action-btn" @click="edit">
            <GlobalSvg class="h-5 w-5 md:h-6 md:w-6" svg="pencil" />
          </button>
        </div>
      </div>
      <hr class="mt-1 sm:mt-3" />
    </div>
    <div class="grid grid-cols-1 mb-5 sm:grid-cols-2">
      <GlobalTextData
        v-for="d in data"
        :key="d.key"
        :title="d.title"
        :text="material[d.key]"
        :color="d.color"
        :svg="d.svg"
        :link="d.link"
      />
    </div>
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
          {{ movimiento.fecha }}
        </td>
        <td class="table-td" :class="claseAccion(movimiento.accion)">
          {{ mostrarAccion(movimiento.accion) }}
        </td>
        <td class="table-td text-gray-500">
          {{ movimiento.cantidad }}
        </td>
      </tr>
    </GlobalInfoTable>
    <LazyModal v-if="open.modal">
      <FormMaterialUpdate is-view @close="open.modal = !open.modal" />
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
      acciones: [
        { value: 1, text: 'Alta' },
        { value: 0, text: 'Baja' },
      ],
      table: ['Fecha', 'Acción', 'Cantidad'],
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
    data() {
      return [
        {
          title: 'Depósito:',
          key: 'deposito',
          svg: 'office-building',
          color: 'indigo',
          link: `/depositos/${this.material.deposito}`,
        },
        {
          title: 'Categoría:',
          key: 'categoria',
          svg: 'clipboard-list',
          color: 'blue',
          link: `/categorias/${this.material.categoria_id}`,
        },
      ];
    },
  },
  beforeDestroy() {
    this.$store.dispatch('materiales/clear');
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
