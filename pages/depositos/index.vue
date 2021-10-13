<template>
  <div>
    <GlobalHeader :title="pageHeader.title" :text="pageHeader.text" />
    <div class="flex flex-col gap-3 lg:flex-row">
      <GlobalAddAction
        text="Agregar un <b>nuevo depósito</b>."
        @click="seleccionarDeposito('add')"
      />
      <Table>
        <template #header>
          <TableHead :header="table.header" />
        </template>
        <template #body>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="deposito in depositos" :key="deposito.id">
              <td class="table-td">
                <router-link
                  :to="`/depositos/${deposito.id}`"
                  class="text-black hover:text-blue-600 hover:underline"
                  @click.native="seleccionarDeposito('view', deposito)"
                >
                  {{ deposito.nombre }}
                </router-link>
              </td>
              <td class="table-td text-gray-500">
                {{ deposito.departamento }}
              </td>
              <td class="table-td text-right">
                <TableButton
                  svg="view"
                  @click="$router.push(`/depositos/${deposito.id}`)"
                />
                <TableButton
                  v-if="!deposito.cantidad_materiales"
                  svg="del"
                  @click="seleccionarDeposito('del', deposito)"
                />
                <TableButton
                  svg="mod"
                  @click="seleccionarDeposito('mod', deposito)"
                />
              </td>
            </tr>
          </tbody>
        </template>
      </Table>
    </div>
    <LazyModal v-if="modal.show">
      <LazyFormDepositoUpdate
        v-if="modal.action == 'mod'"
        @close="modal.show = !modal.show"
      />
      <LazyFormDepositoCreate
        v-else-if="modal.action == 'add'"
        @close="modal.show = !modal.show"
      />
      <LazyFormDepositoDelete
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
        title: 'Depósitos',
        text: 'En los depósitos se encuentran los materiales. Ejemplo de depósitos: Cure, Campus, etc.',
      },
      table: {
        header: ['Nombre', 'Departamento'],
      },
      modal: {
        show: false,
        action: '',
      },
    };
  },
  computed: {
    depositos() {
      return this.$store.state.depositos.depositos;
    },
  },
  mounted() {
    this.$store.dispatch('depositos/all');
  },
  methods: {
    seleccionarDeposito(action, deposito = null) {
      if (deposito) this.$store.dispatch('depositos/select', deposito);
      if (action != 'view') {
        this.modal.action = action;
        this.modal.show = !this.modal.show;
      }
    },
  },
};
</script>

<style></style>
