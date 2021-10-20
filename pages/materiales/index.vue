<template>
  <div>
    <GlobalHeader :title="pageHeader.title" :text="pageHeader.text" />
    <div class="flex flex-col gap-3 lg:flex-row">
      <div class="table-actions">
        <GlobalAddAction
          text="Agregar <b>materiales</b>."
          @click="$router.push('/materiales/agregar')"
        />
      </div>
      <Table>
        <template #header>
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
                :to="`/deposito/${material.deposito}`"
                class="hover:text-blue-600 hover:underline"
                @click.native="verDeposito(material.deposito)"
              >
                {{ material.deposito }}
              </router-link>
            </td>
            <td class="table-td text-gray-500">
              <router-link
                :to="`/categoria/${material.categoria}`"
                class="hover:text-blue-600 hover:underline"
                @click.native="verCategoria(material.categoria)"
              >
                {{ material.categoria }}
              </router-link>
            </td>
            <td class="table-td text-gray-500">
              {{ material.cantidad_materiales || 0 }}
            </td>
            <td class="table-td text-right">
              <TableButton
                svg="view"
                @click="$router.push(`/materiales/${material.id}`)"
              />
              <TableButton
                v-if="!material.cantidad_materiales"
                svg="del"
                @click="seleccionarMaterial('del', material)"
              />
              <TableButton
                svg="mod"
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
  data() {
    return {
      pageHeader: {
        materiales: [],
        title: 'Materiales',
        text: 'Materiales registrados en el sistema. Ejemplo de materiales: Pelotas, Chalecos, Conos, etc.',
      },
      table: {
        header: ['Nombre', 'Deposito', 'Categoría', 'Cantidad'],
      },
      modal: {
        show: false,
        action: '',
      },
    };
  },
  computed: {
    materiales() {
      return this.$store.state.materiales.materiales;
    },
  },
  mounted() {
    this.$store.dispatch('materiales/all');
  },
  methods: {
    seleccionarMaterial(action, material = null) {
      console.log(material);
      if (material) this.$store.dispatch('materiales/select', material);
      if (action != 'view') {
        this.modal.action = action;
        this.modal.show = !this.modal.show;
      }
    },
    verDeposito(dep) {
      this.$store.dispatch('depositos/select', {
        id: dep,
      });
    },
    verCategoria(cat) {
      this.$store.dispatch('categorias/select', {
        id: cat,
      });
    },
  },
};
</script>

<style></style>
