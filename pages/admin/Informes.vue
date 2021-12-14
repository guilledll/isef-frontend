<template>
  <div>
    <GlobalHeader :title="header.title" :text="header.text" />
    <div>
      <FormSelect
        id="deposito_id"
        v-model.trim="filtro.id"
        name="deposito_id"
        @change="filtrar"
      >
        <template #options>
          <option value="0">Seleccionar depósito</option>
          <option
            v-for="deposito in depositos"
            :key="deposito.id"
            :value="deposito.id"
          >
            {{ deposito.nombre }}
          </option>
        </template>
      </FormSelect>
    </div>
    <div class="flex flex-col gap-3 lg:flex-row">
      <Table>
        <template #head>
          <TableHead :header="table.header" :action="false" />
        </template>
        <template #body>
          <tr v-for="informe in informes" :key="informe.id">
            <td class="table-td">
              <router-link
                :to="`/usuarios/${informe.reportador_ci}`"
                class="hover:text-blue-600 hover:underline"
              >
                {{ informe.reportador_ci }}
              </router-link>
            </td>
            <td class="table-td">
              <router-link
                :to="`/reservas/${informe.reserva_id}`"
                class="hover:text-blue-600 hover:underline"
              >
                ver reserva
              </router-link>
            </td>
            <td class="table-td nota" @click="verInforme(informe)">
              <GlobalSvg class="h-5 w-5 m-auto" svg="info-circle" />
            </td>
            <td class="table-td text-gray-500">
              {{ formatearFecha(informe.fecha) }}
            </td>
          </tr>
        </template>
      </Table>
    </div>
    <LazyModal v-if="modal">
      <ReservaVer @close="modal = !modal" />
    </LazyModal>
  </div>
</template>

<script>
import FechaMixin from '@/mixins/FechaMixin';
export default {
  mixins: [FechaMixin],
  layout: 'AppLayout',
  data() {
    return {
      header: {
        title: 'Informes recibidos',
        text: 'Historial de informes recibidos.',
      },
      table: {
        header: ['Reportador', 'Reserva', 'Nota', 'fecha'],
      },
      modal: false,
      informes: [],
      filtro: { id: 1 },
    };
  },
  computed: {
    informesAll() {
      return this.$store.state.informes.informes;
    },
    filtrados() {
      return this.$store.state.informes.filtrados;
    },
    depositos() {
      return this.$store.getters['depositos/conReservas'];
    },
  },
  async mounted() {
    await this.$store.dispatch('informes/all');
    this.informes = this.informesAll;
    await this.$store.dispatch('depositos/all');
  },
  methods: {
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
          break;
        case 2:
          accion = 'Movimiento';
          break;
      }
      return accion;
    },
    verInforme(informe) {
      this.$store.dispatch('informes/select', informe);
      this.modal = true;
    },
    filtrar() {
      this.$store.dispatch('informes/filtrar', {
        id: this.filtro.id,
      });

      this.informes = this.filtrados;
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
.nota {
  @apply text-center text-gray-500 cursor-pointer hover:text-blue-500 hover:bg-blue-50;
}
</style>
