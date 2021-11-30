<template>
  <div class="alert" :class="color" @click="$emit('click')">
    <GlobalSvg class="h-5 w-5 inline mr-0.5 mb-0.5" :svg="svg" />
    <span>
      <slot></slot>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    color: { type: String, default: 'blue' },
    svg: { type: String, default: 'info-circle' },
  },
};
</script>

<style lang="postcss" scoped>
.alert {
  @apply py-3 px-4 mt-4 w-full rounded-md font-medium text-base;
  &.indigo {
    @apply bg-indigo-200 text-indigo-800;
  }
  &.blue {
    @apply bg-blue-200 text-blue-800;
  }
  &.green {
    @apply bg-green-200 text-green-800;
  }
  &.red {
    @apply bg-red-200 text-red-800;
  }
  &.gray {
    @apply bg-gray-200 text-gray-800;
  }
  &.yellow {
    @apply bg-yellow-200 text-yellow-800;
  }
}
</style>
