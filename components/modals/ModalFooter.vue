<template>
  <div class="modal-footer">
    <button
      class="action-btn"
      :class="[bg, hover, focus]"
      @click="$emit('action')"
    >
      {{ text }}
    </button>
    <button type="button" class="cancel-btn" @click="$emit('close')">
      Cancelar
    </button>
  </div>
</template>

<script>
export default {
  props: {
    color: { type: String, default: 'blue' },
    text: { type: String, default: 'Acción' },
  },
  computed: {
    bg() {
      return `bg-${this.color}-600`
    },
    hover() {
      return `hover:bg-${this.color}-700`
    },
    focus() {
      return `focus:ring-${this.color}-500`
    },
  },
}
</script>

<style lang="postcss" scoped>
.modal-footer {
  @apply bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse;
  & > button {
    @apply w-full inline-flex justify-center rounded-md border shadow-sm px-4 py-2 text-base font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm;
  }
  & > .action-btn {
    @apply border-transparent text-white;
  }
  & > .cancel-btn {
    @apply border-gray-300 bg-white text-gray-700 mt-3 hover:bg-gray-50 focus:ring-gray-500 sm:mt-0;
  }
}
</style>
