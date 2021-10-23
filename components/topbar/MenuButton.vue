<template>
  <button class="menu-btn" @click="clicked">
    <GlobalSvg class="h-6 w-6" :svg="svg" />
  </button>
</template>

<script>
export default {
  props: {
    svg: { type: String, default: 'view-list' },
  },
  methods: {
    clicked() {
      this.$emit('clicked');
    },
  },
};
</script>

<style lang="postcss" scoped>
.menu-btn {
  @apply bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-500;
}
</style>
