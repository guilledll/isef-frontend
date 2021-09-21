<template>
  <button class="menu-btn" @click="clicked">
    <svg
      class="h-6 w-6"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        v-if="icon == 'x'"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M6 18L18 6M6 6l12 12"
      />
      <path
        v-if="icon == 'menu'"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  </button>
</template>

<script>
export default {
  props: {
    icon: { type: String, default: 'menu' },
    value: { type: Boolean, default: false },
  },
  methods: {
    clicked() {
      this.$emit('clicked', !this.value)
    },
  },
}
</script>

<style lang="postcss" scoped>
.menu-btn {
  @apply bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500;
}
</style>
