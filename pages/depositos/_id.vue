<template>
  <div class="page-container">
    <div class="page-side">
      <button class="btn blue side"></button>
    </div>
    <div class="mb-4 md:mb-6">
      <div class="flex justify-between">
        <h3 class="text-2xl text-gray-900 font-1 md:text-4xl">
          {{ deposito.nombre }}
        </h3>
        <div>
          <button class="action-btn" @click="edit">
            <GlobalSvg class="h-5 w-5 md:h-6 md:w-6" svg="pencil" />
          </button>
        </div>
      </div>
      <hr class="mt-3" />
    </div>
    <div class="grid grid-cols-1 mb-5 sm:grid-cols-2 lg:grid-cols-3">
      <div class="flex items-center text-lg md:text-xl">
        <span class="flex items-center mr-1.5 font-semibold text-gray-800">
          <GlobalSvg class="h-5 w-5 mr-1 text-blue-600" svg="location-marker" />
          Departamento:
        </span>
        <router-link
          class="hover:underline hover:text-blue-600"
          :to="`/departamentos/${deposito.departamento_id}`"
        >
          {{ deposito.departamento }}
        </router-link>
      </div>
    </div>
    <div class="grid gap-3 lg:grid-cols-2">
      <GlobalInfoTable
        title="Materiales"
        svg="cube"
        :table="table"
        :open="open.table"
        :count="materiales.length"
        @click="showDetails()"
      >
        <tr v-for="material in materiales" :key="material.id">
          <td class="table-td">
            <router-link
              :to="`/materiales/${material.id}`"
              class="text-black hover:text-blue-600 hover:underline"
            >
              {{ material.nombre }}
            </router-link>
          </td>
          <td class="table-td">
            <router-link
              :to="`/categorias/${material.categoria_id}`"
              class="text-black hover:text-blue-600 hover:underline"
            >
              {{ material.categoria }}
            </router-link>
          </td>
          <td class="table-td text-gray-500">
            {{ material.cantidad }}
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
      table: ['Nombre', 'Categoría', 'Cantidad'],
    };
  },
  computed: {
    deposito() {
      return (
        this.$store.state.depositos.deposito ||
        this.$store.dispatch('depositos/get', this.$route.params.id)
      );
    },
    materiales() {
      return this.$store.state.depositos.materiales;
    },
  },
  methods: {
    async showDetails() {
      if (!this.materiales.length) {
        await this.$store.dispatch('depositos/materiales', this.deposito.id);
      }
      this.open.table = !this.open.table;
    },
    edit() {
      this.open.modal = !this.open.modal;
    },
  },
};
</script>
