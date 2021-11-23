<template>
  <div>
    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <div class="modal-form-body m-auto w-full">
        <h3 class="mb-7 text-xl text-gray-800 font-1 sm:text-2xl">
          Reserva nro. #
        </h3>
      </div>
    </div>
    <ModalFooter @close="$emit('close')" />
  </div>
</template>

<script>
export default {
  computed: {
    // perdidos() {
    //   return this.$store.state.reservas;
    // },
  },
};
</script>

<style></style>
