<template>
  <div>
    <GlobalHeader :title="pageHeader.title" :text="pageHeader.text" />
    <div>
      <FormSelect
        id="departamento_id"
        v-model.trim="filtro.id"
        name="departamento_id"
        @change="filtrar"
      >
        <template #options>
          <option value="0">Seleccionar departamento</option>
          <option
            v-for="departamento in departamentos"
            :key="departamento.id"
            :value="departamento.id"
          >
            {{ departamento.nombre }}
          </option>
        </template>
      </FormSelect>
    </div>
    <div class="flex flex-col gap-3 lg:flex-row">
      <div class="table-actions">
        <GlobalCallToAction
          text="Agregar un <b>nuevo depósito</b>."
          svg="archive"
          @click="seleccionarDeposito('add')"
        />
        <GlobalCallToAction
          text="Ir a <b>departamentos</b>."
          type="view"
          svg="map"
          @click="$router.push('/departamentos')"
        />
      </div>
      <Table>
        <template #head>
          <TableHead :header="table.header" />
        </template>
        <template #body>
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
              <router-link
                :to="`/departamentos/${deposito.departamento_id}`"
                class="hover:text-blue-600 hover:underline"
                @click.native="verDepartamento(deposito)"
              >
                {{ deposito.departamento }}
              </router-link>
            </td>
            <td class="table-td text-gray-500">
              {{ deposito.cantidad_materiales || 0 }}
            </td>
            <td class="table-td text-right">
              <TableButton
                type="view"
                @click="$router.push(`/depositos/${deposito.id}`)"
              />
              <TableButton
                v-if="!deposito.cantidad_materiales"
                type="delete"
                @click="seleccionarDeposito('del', deposito)"
              />
              <TableButton
                type="edit"
                @click="seleccionarDeposito('mod', deposito)"
              />
            </td>
          </tr>
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
  middleware: 'admin',
  data() {
    return {
      pageHeader: {
        title: 'Depósitos',
        text: 'En los depósitos se encuentran los materiales. Ejemplo de depósitos: Cure, Campus, etc.',
      },
      table: {
        header: ['Nombre', 'Sede', 'Materiales'],
      },
      modal: {
        show: false,
        action: '',
      },
      depositos: [],
      filtro: { id: 1 },
    };
  },
  computed: {
    departamentos() {
      return this.$store.getters['departamentos/conDepositos'];
    },
    depositosAll() {
      return this.$store.state.depositos.depositos;
    },
    filtrados() {
      return this.$store.state.depositos.filtrados;
    },
  },
  async mounted() {
    await this.$store.dispatch('depositos/all');
    this.depositos = this.depositosAll;
    await this.$store.dispatch('departamentos/all');
  },
  methods: {
    seleccionarDeposito(action, deposito = null) {
      if (deposito) this.$store.dispatch('depositos/select', deposito);
      if (action != 'view') {
        this.modal.action = action;
        this.modal.show = !this.modal.show;
      }
    },
    verDepartamento(dep) {
      this.$store.dispatch('departamentos/select', {
        id: dep.departamento_id,
        nombre: dep.departamento,
      });
    },
    filtrar() {
      this.$store.dispatch('depositos/filtar', {
        id: this.filtro.id,
      });
      this.depositos = this.filtrados;
    },
  },
};
</script>

<style></style>
