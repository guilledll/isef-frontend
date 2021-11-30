<template>
  <form @submit.prevent="confirmarReserva">
    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <div class="modal-form-body m-auto w-full">
        <h3 class="mb-1 text-xl text-gray-800 font-1 sm:text-2xl">
          Gestionar Reserva
        </h3>
        <p class="font-1">
          Aprobar o rechazar reserva realizada por {{ reserva.user }}.
        </p>
        <hr class="w-full mt-2" />
        <GlobalAlert class="!my-4" color="yellow">
          Esta reserva tiene una duración superiror a 24hs, para ser válida un
          administrador debe aprobarla primero.
        </GlobalAlert>
        <div class="mb-5 grid grid-cols-2 gap-3 text-left sm:gap-5">
          <GlobalInputData
            v-for="res in data"
            :key="res.key"
            :title="res.title"
            :value="datoReserva(res.key)"
            :color="res.color"
            :svg="res.svg"
          />
        </div>
        <div v-if="reserva.nota_usuario" class="mb-3">
          <LazyGlobalInputData
            title="Notas del usuario"
            :value="reserva.nota_usuario"
            color="yellow"
            svg="chat-alt"
          />
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
      </div>
    </div>
    <ModalFooter :button="false" close-text="Volver" @close="$emit('close')" />
  </form>
</template>

<script>
import FechaMixin from '@/mixins/FechaMixin';
export default {
  mixins: [FechaMixin],
  data() {
    return {
      form: {
        estado: null,
      },
      data: [
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
          key: 'razon',
          title: 'Razón de uso',
          color: 'purple',
          svg: 'question-circle',
        },
        {
          key: 'lugar',
          title: 'Lugar de uso',
          color: 'pink',
          svg: 'location-marker',
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
  },
  methods: {
    confirmarReserva() {
      if (this.invalid()) return;

      // this.$store
      //   .dispatch('reservas/confirmarReserva', this.form)
      //   .then(() => {
      //     this.$emit('close');
      //     this.$store.dispatch('reservas/clear');
      //     let query = this.form.validar ? 'true' : 'false';
      //     this.$router.push({
      //       path: `/perfil/${this.reserva.user_ci}`,
      //       query: { res: query },
      //     });
      //   })
    },
    // Devuelve el valor, si es fecha la traduce
    datoReserva(key) {
      return key === 'inicio' || key === 'fin'
        ? this.formatearFecha(this.reserva[key])
        : this.reserva[key];
    },
  },
};
</script>

<style lang="postcss" scoped>
::v-deep .form-label {
  @apply text-gray-700 !important;
}
</style>
