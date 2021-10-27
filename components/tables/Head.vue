<template>
  <thead class="bg-gray-50">
    <tr>
      <th v-for="(col, i) in header" :key="i" scope="col" class="table-th">
        {{ col }}
      </th>
      <th v-if="action" scope="col" class="table-th !text-right">Acciones</th>
    </tr>
  </thead>
</template>

<script>
export default {
  props: {
    header: { type: Array, default: () => [] },
    action: { type: Boolean, default: true },
  },
};
</script>

<style lang="postcss" scoped>
.table-th {
  @apply p-3 text-left text-xs font-medium whitespace-nowrap text-gray-500 uppercase tracking-wider max-w-[180px] overflow-hidden overflow-ellipsis select-none md:px-6 md:py-3 md:text-base;
}
</style>
