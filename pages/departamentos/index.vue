<template>
  <div>
    <GlobalHeader :title="header.title" :text="header.text" />
    <div class="flex flex-col gap-3 lg:flex-row">
      <GlobalAddAction
        text="Agregar un <b>departamento</b>."
        @click="seleccionarDepartamento('add')"
      />
      <Table>
        <template #header>
          <TableHead :header="table.header" />
        </template>
        <template #body>
          <tr v-for="departamento in departamentos" :key="departamento.id">
            <td class="table-td">
              <router-link
                :to="`/departamentos/${departamento.id}`"
                class="text-black hover:text-blue-600 hover:underline"
                @click.native="seleccionarDepartamento('view', departamento)"
              >
                {{ departamento.nombre }}
              </router-link>
            </td>
            <td class="table-td text-gray-500">
              {{ departamento.users_count || 0 }}
            </td>
            <td class="table-td text-gray-500">
              {{ departamento.depositos_count || 0 }}
            </td>
            <td class="table-td text-right">
              <TableButton
                svg="view"
                @click="$router.push(`/departamentos/${departamento.id}`)"
              />
              <TableButton
                v-if="!departamento.users_count"
                svg="del"
                @click="seleccionarDepartamento('del', departamento)"
              />
              <TableButton
                svg="mod"
                @click="seleccionarDepartamento('mod', departamento)"
              />
            </td>
          </tr>
        </template>
      </Table>
    </div>
    <LazyModal v-if="modal.show">
      <LazyFormDepartamentoUpdate
        v-if="modal.action == 'mod'"
        @close="modal.show = !modal.show"
      />
      <LazyFormDepartamentoCreate
        v-else-if="modal.action == 'add'"
        @close="modal.show = !modal.show"
      />
      <LazyFormDepartamentoDelete
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
      header: {
        title: 'Departamentos',
        text: 'Cualquiera de los 19 departamentos donde ISEF tenga sede, en caso de expandirese a uno nuevo, se debe registrar el departamentos aquí.',
      },
      table: {
        header: ['Nombre', 'Cantidad Usuarios', 'Cantidad Depósitos'],
      },
      modal: {
        show: false,
        action: '',
      },
    };
  },
  computed: {
    departamentos() {
      return this.$store.state.departamentos.departamentos;
    },
  },
  async mounted() {
    await this.$store.dispatch('departamentos/getAll');
  },
  methods: {
    seleccionarDepartamento(action, departamento = null) {
      if (departamento)
        this.$store.dispatch('departamentos/select', departamento);
      if (action != 'view') {
        this.modal.action = action;
        this.modal.show = !this.modal.show;
      }
    },
  },
};
</script>

<style></style>
