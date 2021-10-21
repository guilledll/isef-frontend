<template>
  <div class="modal-footer">
    <button
      v-if="button"
      class="action-btn"
      type="submit"
      :class="type"
      :disabled="disabled || loading"
      @click="$emit('action')"
    >
      <span v-if="!loading">{{ text }}</span>
      <GlobalSvg v-else class="h-5 w-5 animate-spin mx-4" svg="spin" />
    </button>
    <button type="button" class="cancel-btn" @click="close">Cancelar</button>
  </div>
</template>

<script>
export default {
  props: {
    type: { type: String, default: 'mod' },
    text: { type: String, default: 'Acción' },
    disabled: { type: Boolean, default: false },
    button: { type: Boolean, default: true },
  },
  computed: {
    loading() {
      return this.$store.state.global.loading;
    },
  },
  mounted() {
    this.$store.dispatch('global/loading', false);
  },
  methods: {
    close() {
      this.$store.dispatch('global/loading', false);
      this.$emit('close');
    },
  },
};
</script>

<style lang="postcss" scoped>
.modal-footer {
  @apply bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse;
  & > button {
    @apply w-full inline-flex justify-center rounded-md border shadow-sm px-4 py-2 text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm;
  }
  & > .action-btn {
    @apply border-transparent text-white disabled:cursor-default;
    &.mod {
      @apply bg-blue-500 hover:bg-blue-600 focus:ring-blue-500 disabled:bg-blue-300;
    }
    &.add {
      @apply bg-green-600 hover:bg-green-500 focus:ring-green-600 disabled:bg-green-300;
    }
    &.del {
      @apply bg-red-500 hover:bg-red-600 focus:ring-red-500 disabled:bg-red-300;
    }
  }
  & > .cancel-btn {
    @apply border-gray-300 bg-white text-gray-700 mt-3 hover:bg-gray-50 focus:ring-gray-500 sm:mt-0;
  }
}
</style>
