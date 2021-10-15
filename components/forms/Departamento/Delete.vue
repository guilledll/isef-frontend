<template>
  <form @submit.prevent="deleteDepartamento">
    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <div class="sm:flex sm:items-start">
        <ModalLeftIcon type="del" />
        <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <h3 class="text-xl leading-6 font-medium text-gray-800 mb-3 mt-2">
            Eliminar departamento
          </h3>
          <p class="mb-2">
            <span class="font-medium text-gray-900 mr-1">Atención:</span>
            Estas a punto de eliminar un departamento, este será removido del
            sistema para siempre.
          </p>
          <p class="font-medium text-red-600">¿Estás seguro de continuar?</p>
        </div>
      </div>
    </div>
    <ModalFooter text="Eliminar departamento" type="del" @close="closeModal" />
  </form>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    departamento() {
      return this.$store.state.departamentos.departamento;
    },
  },
  mounted() {},
  methods: {
    deleteDepartamento() {
      this.$store
        .dispatch('departamentos/delete', this.departamento.id)
        .then(() => this.$emit('close'));
    },
    closeModal() {
      this.$store.dispatch('departamentos/clear');
      this.$emit('close');
    },
  },
};
</script>
