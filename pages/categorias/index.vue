<template>
  <div>
    <GlobalHeader :title="pageHeader.title" :text="pageHeader.text" />
    <div class="flex flex-col gap-3 lg:flex-row">
      <GlobalAddAction
        text="Agregar <b>nueva categoría</b> para materiales."
        @click="seleccionarCategoria('add')"
      />
      <Table>
        <template #header>
          <TableHead :header="table.header" />
        </template>
        <template #body>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="categoria in categorias" :key="categoria.id">
              <td class="table-td">
                <router-link
                  :to="`/categorias/${categoria.id}`"
                  class="text-black hover:text-blue-600 hover:underline"
                  @click.native="seleccionarCategoria('view', categoria)"
                >
                  {{ categoria.nombre }}
                </router-link>
              </td>
              <td class="table-td text-gray-500">
                {{ categoria.cantidad_materiales || 0 }}
              </td>
              <td class="table-td text-right">
                <TableButton
                  svg="view"
                  @click="$router.push(`/categorias/${categoria.id}`)"
                />
                <TableButton
                  v-if="!categoria.cantidad_materiales"
                  svg="del"
                  @click="seleccionarCategoria('del', categoria)"
                />
                <TableButton
                  svg="mod"
                  @click="seleccionarCategoria('mod', categoria)"
                />
              </td>
            </tr>
          </tbody>
        </template>
      </Table>
    </div>
    <LazyModal v-if="modal.show">
      <LazyFormCategoriaUpdate
        v-if="modal.action == 'mod'"
        @close="modal.show = !modal.show"
      />
      <LazyFormCategoriaCreate
        v-else-if="modal.action == 'add'"
        @close="modal.show = !modal.show"
      />
    </LazyModal>
  </div>
</template>

<script>
export default {
  layout: 'AppLayout',
  data() {
    return {
      pageHeader: {
        title: 'Categorías de materiales',
        text: 'Los materiales pertenecen a categorías, por ejemplo: fútbol, pesas, atletismo, etc.',
      },
      table: {
        header: ['Nombre', 'Materiales'],
      },
      modal: {
        show: false,
        action: '',
      },
    };
  },
  computed: {
    categorias() {
      return this.$store.state.categorias.categorias;
    },
  },
  async mounted() {
    this.$store.dispatch('categorias/all');
  },
  methods: {
    seleccionarCategoria(action, categoria = null) {
      if (categoria) this.$store.dispatch('categorias/select', categoria);
      this.modal.action = action;
      this.modal.show = !this.modal.show;
    },
  },
};
</script>
