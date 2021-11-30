<template>
  <div v-if="reserva">
    <LazyGlobalAlert v-if="alerta" color="green" svg="check" class="mb-6 !mt-0">
      Las acciones se guardaron correctamente.
    </LazyGlobalAlert>
    <LazyGlobalHeader :title="header(1)" :text="header(0)" />
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
    <div v-if="reserva.nota_usuario || reserva.nota_guardia">
      <hr class="border-gray-100 my-4 w-full" />
      <div class="grid gap-4 text-left mt-4 sm:gap-5 sm:mt-5 sm:grid-cols-2">
        <LazyGlobalInputData
          v-if="reserva.nota_usuario"
          title="Notas del usuario"
          :value="reserva.nota_usuario"
          color="pink"
          svg="pencil"
        />
        <LazyGlobalInputData
          v-if="reserva.nota_guardia"
          title="Notas del guardia"
          :value="reserva.nota_guardia"
          color="purple"
          svg="pencil"
        />
      </div>
    </div>
    <hr class="border-gray-100 my-4 w-full" />

    <!-- LISTA DE MATERIALES -->
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

    <!-- BOTONES DE GUARDIA -->
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
      <button
        v-if="admin && reserva.estado == 3"
        class="btn indigo"
        @click="verAdmin"
      >
        <GlobalSvg svg="info-circle" class="h-5 w-5 mr-2" />
        Ver reserva
      </button>
    </div>

    <!-- ALERTAS Y MENSAJES -->
    <LazyGlobalAlert
      v-if="reserva.estado == 4 && perdidos"
      color="yellow"
      svg="clipboard-list"
      class="cursor-pointer"
      @click="verPerdidos()"
    >
      Se reportaron materiales perdidos / dañados en esta reserva. Puedes verlos
      <span class="underline">presionando aquí.</span>
    </LazyGlobalAlert>

    <LazyGlobalAlert v-if="reserva.estado == 4" color="gray">
      Esta reserva se dió por finalizada.
    </LazyGlobalAlert>

    <LazyGlobalAlert v-if="reserva.estado == 5" color="red">
      Esta reserva fue cancelada.
    </LazyGlobalAlert>

    <!-- MODALS -->
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
      <LazyFormReservaAprobar
        v-if="modal.type == 'verAdmin'"
        @close="close"
        @accion="accionSobreReserva"
      />
      <LazyFormMaterialPerdidosVer v-if="modal.type == 'mat'" @close="close" />
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
      alerta: false,
    };
  },
  computed: {
    reserva() {
      return this.$store.state.reservas.reserva;
    },
    materiales() {
      return this.$store.state.reservas.materialesDisponibles;
    },
    perdidos() {
      return this.$store.state.materialesPerdidos.material;
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
  watch: {
    $route(to) {
      // Si se realizo una reserva, muestra la alerta
      let acc = to.query.accion;
      if (acc) {
        this.alerta = true;
      }
    },
  },
  async mounted() {
    await this.$store.dispatch('reservas/get', this.$route.params.id);
    // Si se realizo una reserva, muestra la alerta
    let acc = this.$route.query.accion;
    if (acc) {
      this.alerta = true;
    }
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
    async verPerdidos() {
      this.modal.type = 'mat';
      this.close();
      await this.$store.dispatch('materialesPerdidos/get', this.perdidos.id);
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
      this.$router.push({ path: '/guardia', query: { res: id } });
    },
    close() {
      this.modal.open = !this.modal.open;
    },
    verAdmin() {
      this.close();
      this.modal.type = 'verAdmin';
    },
    accionSobreReserva(data) {
      this.$store.dispatch('reservas/cambiarEstado', data).then(() => {
        this.$router.push({
          path: '/guardia',
          query: { aprobada: data.accion },
        });
      });
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
