<template>
  <div>
    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <div class="sm:flex sm:items-start">
        <ModalLeftIcon type="delete" />
        <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <h3 class="mb-5 text-xl text-gray-800 font-1 sm:text-2xl">
            Cancelar reserva
          </h3>
          <p class="mb-2">
            <span class="font-medium text-gray-900 mr-1">Atención:</span>
            Estás a punto de cancelar tu reserva.
          </p>
          <p class="font-medium text-red-600">¿Estás seguro de continuar?</p>
        </div>
      </div>
    </div>
    <ModalFooter
      type="del"
      text="Cancelar reserva"
      close-text="Cerrar"
      :disabled="disabled"
      @action="cancelarReserva"
      @close="closeModal"
    />
  </div>
</template>

<script>
export default {
  computed: {
    reserva() {
      return this.$store.state.reservas.reserva;
    },
    disabled() {
      // Se cancela si está en los estados:  Aprobada 2 o Pendiente 3.
      return (
        this.reserva.estado == '1' ||
        this.reserva.estado == '4' ||
        this.reserva.estado == '5'
      );
    },
  },
  methods: {
    async cancelarReserva() {
      await this.$store
        .dispatch('reservas/cancelar', this.reserva.id)
        .then(() => this.closeModal());
    },
    closeModal() {
      this.$store.dispatch('reservas/clear');
      this.$emit('close');
    },
  },
};
</script>
