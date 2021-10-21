<template>
  <form @submit.prevent="deleteMaterial">
    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <div class="sm:flex sm:items-start">
        <ModalLeftIcon type="del" />
        <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <h3 class="modal-form-heading">Eliminar material</h3>
          <p class="mb-2">
            <span class="font-medium text-gray-900 mr-1">Atención:</span>
            Estás a punto de eliminar el material, este será removido del
            sistema para siempre.
          </p>
          <p class="font-medium text-red-600">¿Estás seguro de continuar?</p>
        </div>
      </div>
    </div>
    <ModalFooter text="Eliminar material" type="del" @close="closeModal" />
  </form>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    material() {
      return this.$store.state.materiales.material;
    },
  },
  methods: {
    deleteMaterial() {
      this.$store
        .dispatch('materiales/delete', this.material.id)
        .then(() => this.$emit('close'));
    },
    closeModal() {
      this.$store.dispatch('materiales/clear');
      this.$emit('close');
    },
  },
};
</script>
