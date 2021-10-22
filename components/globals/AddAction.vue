<template>
  <div class="action" :class="color">
    <div class="flex pl-1 lg:block">
      <!-- eslint-disable-next-line -->
      <span class="text-sm sm:text-base lg:text-lg" v-html="text">
        {{ text }}
      </span>
    </div>
    <button :class="color" @click="$emit('click')">
      <div v-if="svg == 'add'" class="flex items-center">
        <GlobalSvg class="h-6 w-6" svg="clipboard-list" />
        <GlobalSvg class="h-6 w-6" svg="plus" />
      </div>
      <div v-if="svg == 'departamento'" class="flex items-center gap-0.5">
        <GlobalSvg class="h-6 w-6" svg="map" />
        <GlobalSvg class="h-6 w-6" svg="location-marker" />
      </div>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    text: { type: String, default: 'Acción <b>recurso</b>' },
    color: { type: String, default: 'green' },
    svg: { type: String, default: 'add' },
  },
};
</script>

<style lang="postcss" scoped>
.action {
  @apply flex items-center justify-between h-auto bg-gray-50 border rounded-md p-2 lg:flex-col lg:top-0 lg:sticky;
  &.green {
    @apply border-green-200;
  }
  &.indigo {
    @apply border-indigo-300;
  }
  & > button {
    @apply flex items-center justify-center gap-1 rounded-md text-white h-full px-3.5 py-2 sm:py-2.5 lg:gap-0 lg:w-full lg:h-auto lg:mt-2;
    &.green {
      @apply bg-green-600 hover:bg-green-500;
    }
    &.indigo {
      @apply bg-indigo-600 hover:bg-indigo-500;
    }
  }
}
</style>
