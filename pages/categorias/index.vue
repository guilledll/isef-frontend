<template>
  <div>
    <GlobalHeader :title="pageHeader.title" :text="pageHeader.text" />
    <div class="flex flex-col gap-3 lg:flex-row">
      <div class="table-actions">
        <GlobalCallToAction
          text="<b>Agregar categoría</b> para materiales."
          svg="clipboard-list"
          @click="seleccionarCategoria('add')"
        />
        <GlobalCallToAction
          text="Ir a <b>materiales</b>."
          type="view"
          svg="cube"
          @click="$router.push('/materiales')"
        />
      </div>
      <Table v-if="categorias.length">
        <template #head>
          <TableHead :header="table.header" />
        </template>
        <template #body>
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
                type="view"
                @click="$router.push(`/categorias/${categoria.id}`)"
              />
              <TableButton
                v-if="!categoria.cantidad_materiales"
                type="delete"
                @click="seleccionarCategoria('del', categoria)"
              />
              <TableButton
                type="edit"
                @click="seleccionarCategoria('mod', categoria)"
              />
            </td>
          </tr>
        </template>
      </Table>
      <LazyGlobalSinDatos v-else model="categorías" />
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
      <LazyFormCategoriaDelete
        v-else-if="modal.action == 'del'"
        @close="modal.show = !modal.show"
      />
    </LazyModal>
  </div>
</template>

<script>
export default {
  layout: 'AppLayout',
  middleware: 'admin',
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
  mounted() {
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
