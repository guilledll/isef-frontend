<template>
  <div>
    <LazyGlobalAlert v-if="alerta" color="green" svg="check" class="mb-6 !mt-0">
      Los materiales se guardaron correctamente.
    </LazyGlobalAlert>
    <GlobalHeader :title="pageHeader.title" :text="pageHeader.text" />
    <div v-if="!totalDepositos || !totalCategorias" class="mt-6">
      <GlobalAlert color="indigo" class="!my-4">
        Para registrar materiales primero deben haber depósitos y categorías en
        el sistema.
      </GlobalAlert>
      <div class="flex items-center justify-start gap-4">
        <router-link v-if="!totalDepositos" to="/depositos" class="btn green">
          <GlobalSvg svg="archive" class="h-6 w-6 mr-1" />
          Agregar Depósitos
        </router-link>
        <router-link
          v-if="!totalCategorias"
          to="/categorias"
          class="btn indigo"
        >
          <GlobalSvg svg="clipboard-list" class="h-6 w-6 mr-1" />
          Agregar Categorías
        </router-link>
      </div>
    </div>
    <div v-else>
      <GlobalSearch
        store="materiales"
        :title="searchTitle"
        :data="materialesFiltradas"
        :inputs="inputs"
        @filtrar="filtrar"
        @limpiar="limpiar"
        @cambiar="cambiarFiltro"
      />
      <div class="flex flex-col gap-3 lg:flex-row">
        <div class="table-actions">
          <GlobalCallToAction
            text="Agregar <b>materiales</b>."
            svg="cube"
            @click="$router.push('/materiales/agregar')"
          />
          <GlobalCallToAction
            text="Ver <b>categorías</b> de materiales."
            type="view"
            svg="clipboard-list"
            @click="$router.push('/categorias')"
          />
        </div>
        <Table>
          <template #head>
            <TableHead :header="table" />
          </template>
          <template #body>
            <tr v-for="material in materiales" :key="material.id">
              <td class="table-td text-gray-500">
                <router-link
                  :to="`/materiales/${material.id}`"
                  class="text-black hover:text-blue-600 hover:underline"
                  @click.native="seleccionarMaterial('view', material)"
                >
                  {{ material.nombre }}
                </router-link>
              </td>
              <td class="table-td text-gray-500">
                <router-link
                  :to="`/categorias/${material.categoria_id}`"
                  class="hover:text-blue-600 hover:underline"
                  @click.native="verCategoria(material.categoria_id)"
                >
                  {{ material.categoria }}
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
                {{ material.cantidad || 0 }}
              </td>
              <td class="table-td text-right">
                <TableButton
                  type="view"
                  @click="$router.push(`/materiales/${material.id}`)"
                />
                <!-- <TableButton
                type="delete"
                @click="seleccionarMaterial('del', material)"
              /> -->
                <TableButton
                  type="edit"
                  @click="seleccionarMaterial('mod', material)"
                />
              </td>
            </tr>
          </template>
        </Table>
      </div>
      <LazyModal v-if="modal.show">
        <LazyFormMaterialUpdate
          v-if="modal.action == 'mod'"
          @actualizado="updateFiltrados"
          @close="modal.show = !modal.show"
        />
        <LazyFormMaterialCreate
          v-else-if="modal.action == 'add'"
          @close="modal.show = !modal.show"
        />
        <LazyFormMaterialDelete
          v-else-if="modal.action == 'del'"
          @close="modal.show = !modal.show"
        />
      </LazyModal>
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
        materiales: [],
        title: 'Materiales',
        text: 'Materiales registrados en el sistema. Ejemplo de materiales: Pelotas, Chalecos, Conos, etc.',
      },
      table: ['Nombre', 'Categoría', 'Deposito', 'Cantidad'],
      modal: {
        show: false,
        action: '',
      },
      materiales: [],
      materialesFiltradas: [],
      inputs: [
        { value: 'deposito_id', text: 'Deposito' },
        { value: 'categoria_id', text: 'Categoría' },
      ],
      searchTitle: 'depósito',
      alerta: false,
    };
  },
  computed: {
    categorias() {
      return this.$store.getters['categorias/conMateriales'];
    },
    materialesAll() {
      return this.$store.state.materiales.materiales;
    },
    filtrados() {
      return this.$store.state.materiales.filtrados;
    },
    depositos() {
      return this.$store.getters['depositos/conMateriales'];
    },
    totalDepositos() {
      return this.$store.state.depositos.depositos.length;
    },
    totalCategorias() {
      return this.$store.state.categorias.categorias.length;
    },
  },
  async mounted() {
    await this.$store.dispatch('materiales/all');
    await this.$store.dispatch('depositos/all');
    await this.$store.dispatch('categorias/all');
    this.cambiarFiltro('deposito_id');
    // Si se agrego algun material, muestra la alerta
    let add = this.$route.query.add;
    if (add) {
      this.alerta = true;
    }
  },
  methods: {
    async seleccionarMaterial(action, material = null) {
      if (material) await this.$store.dispatch('materiales/select', material);
      if (action != 'view') {
        this.modal.action = action;
        this.modal.show = !this.modal.show;
      }
    },
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
      this.materialesFiltradas =
        dato === 'deposito_id' ? this.depositos : this.categorias;
      this.searchTitle = dato === 'deposito_id' ? 'depósito' : 'categoría';
      this.limpiar();
    },
    updateFiltrados() {
      this.modal.show = false;
      this.materiales = this.materialesAll;
    },
  },
};
</script>
