<template>
  <form @submit.prevent="cancelarReserva">
    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <div class="sm:flex sm:items-start">
        <ModalLeftIcon type="del" />
        <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <h3 class="modal-form-heading">Cancelar reserva</h3>
          <p class="mb-2">
            <span class="font-medium text-gray-900 mr-1">Atención:</span>
            Estás a punto de cancelar tu reserva.
          </p>
          <p class="font-medium text-red-600">¿Estás seguro de continuar?</p>
        </div>
      </div>
    </div>
    <ModalFooter
      text="Cancelar reserva"
      type="del"
      :disabled="disabled"
      @close="$emit('close')"
    />
  </form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        user_ci: '',
      },
    };
  },
  computed: {
    reserva() {
      return this.$store.state.reservas.reserva;
    },
    usuario() {
      return this.$auth.user;
    },
    disabled() {
      return (
        this.reserva.estado == '1' ||
        this.reserva.estado == '4' ||
        this.reserva.estado == '5'
      );
    },
  },
  methods: {
    cancelarReserva() {
      // Se cancela si está en los estados:  Aprobada 2 o Pendiente 3.
      if (this.reserva.estado == '2' || this.reserva.estado == '3') {
        this.form.user_ci = this.user.ci;
        this.$store
          .dispatch('reservas/cancelar', {
            id: this.reserva.id,
            data: this.form,
          })
          .then(() => this.$emit('cancelado', this.reserva.id));
      }
    },
  },
};
</script>
