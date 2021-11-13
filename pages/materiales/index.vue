<template>
  <div>
    <GlobalHeader :title="pageHeader.title" :text="pageHeader.text" />
    <!--Filtrar por deposito/categoria-->
    <div>
      <FormSelect
        id="deposito_id"
        v-model.trim="filtro.id"
        name="deposito_id"
        @change="filtrar"
      >
        <template #options>
          <option value="0">Seleccionar</option>
          <option
            v-for="contenido in contenidoFiltrado"
            :key="contenido.id"
            :value="contenido.id"
          >
            {{ contenido.nombre }}
          </option>
        </template>
      </FormSelect>
      <label for="deposito">Deposito</label>
      <input
        id="deposito"
        v-model="filtro.contenido"
        name="filtro"
        type="radio"
        value="deposito_id"
        @change="cambiarFiltro"
      />
      <label for="categoria">Categoria</label>
      <input
        id="categoria"
        v-model="filtro.contenido"
        name="filtro"
        type="radio"
        value="categoria_id"
        @change="cambiarFiltro"
      />
    </div>
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
        <GlobalCallToAction
          text="Mover <b> materiales</b> de depositos"
          type="view"
          svg="clipboard-list"
          @click="$router.push('/movimientos')"
        />
      </div>
      <Table>
        <template #head>
          <TableHead :header="table.header" />
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
              <TableButton
                type="delete"
                @click="seleccionarMaterial('del', material)"
              />
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
      table: {
        header: ['Nombre', 'Categoría', 'Deposito', 'Cantidad'],
      },
      modal: {
        show: false,
        action: '',
      },
      materiales: [],
      contenidoFiltrado: [],
      filtro: { contenido: '', id: 1 },
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
  },
  async mounted() {
    await this.$store.dispatch('materiales/all');
    this.materiales = this.materialesAll;
    await this.$store.dispatch('depositos/all');
    await this.$store.dispatch('categorias/all');
  },
  methods: {
    seleccionarMaterial(action, material = null) {
      if (material) this.$store.dispatch('materiales/select', material);
      if (action != 'view') {
        this.modal.action = action;
        this.modal.show = !this.modal.show;
      }
    },
    verDeposito(dep) {
      this.$store.dispatch('depositos/get', {
        id: dep,
      });
    },
    verCategoria(cat) {
      this.$store.dispatch('categorias/get', {
        id: cat,
      });
    },
    filtrar() {
      this.$store.dispatch('materiales/filtrar', {
        contenido: this.filtro.contenido,
        id: this.filtro.id,
      });
      this.materiales = this.filtrados;
    },
    cambiarFiltro() {
      if (this.filtro.contenido === 'deposito_id') {
        this.contenidoFiltrado = this.depositos;
      } else {
        this.contenidoFiltrado = this.categorias;
      }
      this.filtro.id = 0; //Limpia select
      this.materiales = this.materialesAll;
    },
    updateFiltrados() {
      this.modal.show = false;
      this.materiales = this.materialesAll;
    },
  },
};
</script>
