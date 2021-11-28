<template>
  <div>
    <div v-if="reserva && materialesDisponibles.length">
      <LazyGlobalHeader :title="pageHeader.title" :text="pageHeader.text" />
      <LazyReservaListadoMateriales
        :materiales-disponibles="materialesDisponibles"
      />
      <div class="reserva-footer">
        <button class="btn red gap-1.5" @click="cancelarReserva">
          <GlobalSvg svg="x" class="h-5 w-5" />
          Cancelar
        </button>
        <button
          class="btn green gap-1.5"
          :disabled="!reserva.materiales.length"
          @click="verModal(2)"
        >
          <GlobalSvg svg="check" class="h-5 w-5" />
          Continuar
        </button>
      </div>
    </div>
    <div v-else class="hacer-reserva-container">
      <h4 class="text-2xl font-1 md:text-5xl">Reserva de materiales</h4>
      <div class="flex flex-row gap-5 items-center justify-center">
        <button class="btn green reservar-btn" @click="verModal(1)">
          Hacer reserva
        </button>
        <router-link :to="toRoute()" class="btn indigo reservar-btn">
          Ver reservas
        </router-link>
      </div>
      <div class="mt-16 mb-8 md:mt-28">
        <img class="h-60 w-auto" src="/svg/choose.svg" alt="Reserva" />
      </div>
    </div>
    <LazyModal v-if="modal.open">
      <LazyFormReservaIniciar v-if="modal.tipo == 1" @close="close" />
      <LazyFormReservaConfirmar v-if="modal.tipo == 2" @close="close" />
    </LazyModal>
  </div>
</template>

<script>
export default {
  layout: 'AppLayout',
  middleware({ store, redirect }) {
    if (store.$auth.user.rol === 2) {
      return redirect('/guardia');
    }
  },
  data() {
    return {
      pageHeader: {
        title: 'Elegir materiales',
        text: 'Los materiales listados son los que se encuentran disponibles entre las horas seleccionadas.',
      },
      modal: { open: false, tipo: null },
    };
  },
  computed: {
    materialesDisponibles() {
      return this.$store.state.reservas.materialesDisponibles;
    },
    reserva() {
      return this.$store.state.reservas.reserva;
    },
    user() {
      return this.$auth.user;
    },
  },
  beforeCreate() {
    this.$store.dispatch('reservas/clear');
  },
  methods: {
    verModal(tipo) {
      this.modal.tipo = tipo;
      this.modal.open = true;
    },
    cancelarReserva() {
      let msg = 'Al cancelar se perderán los datos. Desea continuar?';
      if (confirm(msg)) {
        this.$store.dispatch('reservas/cancelarReserva');
        this.$router.push('/reservas');
      }
    },
    close() {
      this.modal.tipo = null;
      this.modal.open = false;
    },
    toRoute() {
      return this.user.rol == 1 ? `/perfil/${this.user.ci}` : '/guardia';
    },
  },
};
</script>

<style lang="postcss" scoped>
.hacer-reserva-container {
  @apply flex items-center justify-center flex-col text-center;
  .reservar-btn {
    @apply rounded-lg px-10 text-xl mt-10;
  }
}
.reserva-footer {
  @apply flex justify-end gap-3 w-full mt-5;
  button {
    @apply w-full sm:w-auto;
  }
}
</style>
