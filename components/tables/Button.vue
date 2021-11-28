<template>
  <button class="table-btn group" @click="$emit('click')">
    <GlobalSvg v-if="type == 'view'" class="view" :svg="svg()" />
    <GlobalSvg v-if="type == 'edit'" class="edit" :svg="svg()" />
    <GlobalSvg v-if="type == 'delete'" class="delete" :svg="svg()" />
    <GlobalSvg v-if="type == 'list'" class="list" :svg="svg()" />
  </button>
</template>

<script>
export default {
  props: {
    type: { type: String, default: 'view' },
  },
  methods: {
    svg() {
      let svg = '';
      switch (this.type) {
        case 'view':
          svg = 'eye';
          break;
        case 'edit':
          svg = 'pencil';
          break;
        case 'delete':
          svg = 'trash';
          break;
        case 'list':
          svg = 'clipboard-list';
          break;
      }
      return svg;
    },
  },
};
</script>

<style lang="postcss" scoped>
.table-btn {
  @apply p-1 rounded-md hover:shadow hover:bg-gray-100 sm:p-2;
}
svg {
  @apply h-5 w-5 text-gray-500;
  &.view {
    @apply group-hover:text-purple-700;
  }
  &.delete {
    @apply group-hover:text-red-700;
  }
  &.edit {
    @apply group-hover:text-blue-700;
  }
  &.list {
    @apply group-hover:text-yellow-700;
  }
}
</style>
