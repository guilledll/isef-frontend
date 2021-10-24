<template>
  <div>
    <div class="related-info" :class="{ 'mb-3': open }" @click="$emit('click')">
      <h4 class="flex items-center gap-2 text-lg text-gray-800 font-1">
        <GlobalSvg class="h-7 w-7" :svg="svg" />
        {{ title }}
      </h4>
      <GlobalSvg
        class="h-6 w-6 transform"
        :class="{ 'rotate-180': open }"
        svg="chevron-down"
      />
    </div>
    <LazyTable v-if="open">
      <template #header>
        <TableHead :header="table" :action="false" />
      </template>
      <template #body>
        <slot></slot>
      </template>
    </LazyTable>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, default: 'Relacionado' },
    table: { type: Array, default: () => [] },
    open: { type: Boolean, default: false },
    svg: { type: String, default: 'user-group' },
  },
};
</script>

<style lang="postcss" scoped>
.related-info {
  @apply flex justify-between items-center w-full px-4 py-3 border border-gray-200 rounded-md bg-gray-50 cursor-pointer hover:bg-gray-100;
}
</style>
