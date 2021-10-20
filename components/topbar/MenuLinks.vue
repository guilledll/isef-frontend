<template>
  <div>
    <router-link
      v-for="(item, i) in items"
      :key="i"
      class="menu-item"
      :to="item.path"
    >
      {{ item.text }}
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
<style lang="postcss" scoped>
.menu-item {
  @apply block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50;
}
</style>
