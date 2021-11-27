<template>
  <form @submit.prevent="cancelarReserva">
    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <div class="sm:flex sm:items-start">
        <ModalLeftIcon type="del" />
        <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <h3 class="modal-form-heading">Cancelar reserva</h3>
          <p class="mb-2">
            <span class="font-medium text-gray-900 mr-1">Atención:</span>
            Estás a punto de eliminar el material, este será removido del
            sistema para siempre.
          </p>
          <p class="font-medium text-red-600">¿Estás seguro de continuar?</p>
        </div>
      </div>
    </div>
    <ModalFooter text="Cancelar reserva" type="del" @close="closeModal" />
  </form>
</template>

<script>
export default {
  data() {
    return {
      form: {
        guardia_ci: '',
      },
    };
  },
  computed: {
    reserva() {
      return this.$store.state.reservas.reserva;
    },
    guardia() {
      return this.$auth.user;
    },
  },
  methods: {
    cancelarReserva() {
      this.form.guardia_ci = this.guardia.ci;
      this.$store
        .dispatch('reservas/entregar', { id: this.reserva.id, data: this.form })
        .then(() => this.$emit('cancelado', this.reserva.id));
    },
  },
};
</script>
