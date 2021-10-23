<template>
  <div class="action">
    <div class="flex pl-1 lg:block">
      <!-- eslint-disable-next-line -->
      <span class="text-sm sm:text-base lg:text-lg" v-html="text">
        {{ text }}
      </span>
    </div>
    <button :class="type" @click="$emit('click')">
      <GlobalSvg class="h-6 w-6" :svg="svg" />
      <GlobalSvg class="h-5 w-5" :svg="type == 'view' ? 'search' : 'plus'" />
    </button>
  </div>
</template>

<script>
export default {
  props: {
    text: { type: String, default: 'Acción <b>recurso</b>' },
    type: { type: String, default: 'add' },
    svg: { type: String, default: 'check' },
  },
};
</script>

<style lang="postcss" scoped>
.action {
  @apply flex items-center justify-between h-auto bg-gray-50 border rounded-md p-2 lg:flex-col lg:top-0 lg:sticky;
  & > button {
    @apply flex items-center justify-center gap-1 rounded-md text-white h-full px-2.5 py-2 sm:py-2.5 lg:gap-0.5 lg:w-full lg:h-auto lg:mt-2;
    &.add {
      @apply bg-green-600 hover:bg-green-500;
    }
    &.view {
      @apply bg-indigo-600 hover:bg-indigo-500;
    }
  }
}
</style>
