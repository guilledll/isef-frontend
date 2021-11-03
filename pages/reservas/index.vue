<template>
  <div class="reserva-container">
    <h4 class="text-2xl font-1 md:text-5xl">Reserva de materiales</h4>
    <div class="flex items-center justify-center">
      <button class="btn green reservar-btn" @click="realizarReserva">
        Hacer reserva
      </button>
    </div>
    <LazyModal v-if="modal">
      <FormReservaIniciar @close="modal = !modal" />
    </LazyModal>
  </div>
</template>

<script>
export default {
  layout: 'AppLayout',
  data() {
    return {
      modal: false,
    };
  },
  methods: {
    realizarReserva() {
      this.modal = !this.modal;
    },
  },
};
</script>

<style lang="postcss" scoped>
.reserva-container {
  @apply flex items-center justify-center flex-col text-center;
  & >>> .reservar-btn {
    @apply rounded-lg px-10 text-xl mt-10;
  }
}
</style>
