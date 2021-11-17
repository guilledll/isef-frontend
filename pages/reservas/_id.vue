<template>
  <div v-if="reserva">
    <LazyGlobalHeader :title="header(1)" :text="header(0)" />
    <div class="mb-6">
      <div
        class="
          grid grid-cols-1
          gap-4
          text-left
          sm:gap-5 sm:grid-cols-3
          md:grid-cols-4
        "
      >
        <GlobalInputData
          v-for="reg in data"
          :key="reg.key"
          :title="reg.title"
          :value="mostrarDato(reg.key)"
          :color="reg.color"
          :svg="reg.svg"
        />
      </div>
      <LazyGlobalInputData
        v-if="reserva.nota_usuario"
        class="mt-5"
        title="Notas de usuario"
        :value="reserva.nota_usuario"
        color="pink"
        svg="chat-alt"
      />
    </div>
    <hr class="border-gray-100 mb-4 w-full" />
    <div class="flex mb-3 items-center">
      <GlobalSvg class="h-6 w-6 mr-1 text-blue-500" svg="cube" />
      <h3 class="text-xl font-1">Materiales reservados</h3>
    </div>
    <Table>
      <template #head>
        <TableHead :header="['Materiales', 'Cantidad']" :action="false" />
      </template>
      <template #body>
        <tr v-for="material in materiales" :key="material.id">
          <td class="table-td">{{ material.nombre }}</td>
          <td class="table-td">{{ material.cantidad }}</td>
        </tr>
      </template>
    </Table>
    <div class="bottom">
      <button
        v-if="guardia && reserva.estado == 2"
        class="btn green"
        @click="entregar"
      >
        Entregar materiales
      </button>
      <button
        v-if="guardia && reserva.estado == 1"
        class="btn blue"
        @click="recibir"
      >
        Recibir materiales
      </button>
    </div>
    <LazyModal v-if="modal.open">
      <LazyFormReservaEntregar
        v-if="modal.type == 'out'"
        @close="close"
        @entregado="entregado"
      />
      <LazyFormReservaRecibir
        v-if="modal.type == 'in'"
        @close="close"
        @recibido="recibido"
      />
    </LazyModal>
  </div>
</template>

<script>
import FechaMixin from '@/mixins/FechaMixin';
export default {
  mixins: [FechaMixin],
  layout: 'AppLayout',
  middleware: 'adminOguardia',
  data() {
    return {
      modal: {
        open: false,
        type: 'out',
      },
      data: [
        {
          key: 'user_ci',
          title: 'Cédula',
          color: 'pink',
          svg: 'identification',
        },
        {
          key: 'user',
          title: 'Usuario',
          color: 'blue',
          svg: 'user',
        },
        {
          key: 'deposito',
          title: 'Depósito',
          color: 'purple',
          svg: 'archive',
        },
        {
          key: 'lugar',
          title: 'Lugar de uso',
          color: 'purple',
          svg: 'location-marker',
        },
        {
          key: 'razon',
          title: 'Razón de uso',
          color: 'yellow',
          svg: 'chat-alt',
        },
        {
          key: 'inicio',
          title: 'Inicia',
          color: 'green',
          svg: 'clock',
        },
        {
          key: 'fin',
          title: 'Finaliza',
          color: 'red',
          svg: 'clock',
        },
        {
          key: 'materiales',
          title: 'Total materiales',
          color: 'gray',
          svg: 'clipboard-list',
        },
      ],
    };
  },
  computed: {
    reserva() {
      return this.$store.state.reservas.reserva;
    },
    materiales() {
      return this.$store.state.reservas.materialesDisponibles;
    },
    totalMateriales() {
      return this.materiales.reduce((a, b) => {
        return a + b.cantidad;
      }, 0);
    },
    guardia() {
      return this.$auth.user.rol == 2;
    },
    admin() {
      return this.$auth.user.rol == 3;
    },
  },
  async mounted() {
    await this.$store.dispatch('reservas/get', this.$route.params.id);
  },
  methods: {
    entregar() {
      this.close();
      this.modal.type = 'out';
    },
    recibir() {
      this.close();
      this.modal.type = 'in';
    },
    mostrarDato(key) {
      return key === 'inicio' || key === 'fin'
        ? this.formatearFecha(this.reserva[key])
        : key === 'materiales'
        ? this.totalMateriales
        : this.reserva[key];
    },
    header(nro) {
      return nro
        ? `Reserva nro #${this.reserva.id}`
        : `Información de la reserva realizada por ${this.reserva.user}.`;
    },
    entregado(id) {
      this.close();
      this.$router.push({ path: '/guardia', query: { ent: id } });
    },
    recibido(id) {
      this.close();
      this.$router.push({ path: '/guardia', query: { in: id } });
    },
    close() {
      this.modal.open = !this.modal.open;
    },
  },
};
</script>

<style lang="postcss" scoped>
.bottom {
  @apply flex justify-end items-center w-full mt-4 gap-4;
  button {
    @apply text-xl;
  }
}
</style>
