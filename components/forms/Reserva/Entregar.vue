<template>
  <div>
    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <div class="modal-form-body m-auto w-full">
        <h3 class="mb-5 text-xl text-gray-800 font-1 sm:text-2xl">
          Reserva nro. #{{ reserva.id }}
        </h3>
        <div class="space-y-2">
          <p>
            Al confirmar la entrega de materiales esta reserva figurará como
            entregada por ustéd al usuario
            <span class="font-1">{{ reserva.user }}</span>
          </p>
        </div>
      </div>
    </div>
    <ModalFooter
      type="add"
      text="Entregar materiales"
      @action="entregar"
      @close="closeModal"
    />
  </div>
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
    entregar() {
      this.form.guardia_ci = this.guardia.ci;
      this.$store
        .dispatch('reservas/entregar', { id: this.reserva.id, data: this.form })
        .then(() => this.$emit('entregado', this.reserva.id));
    },
    closeModal() {
      if (!this.isView) this.$store.dispatch('reservas/clear');
      this.$emit('close');
    },
  },
};
</script>
