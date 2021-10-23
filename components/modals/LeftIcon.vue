<template>
  <div class="left" :class="type">
    <GlobalSvg v-if="type == 'add'" :svg="svg()" />
    <GlobalSvg v-if="type == 'edit'" :svg="svg()" />
    <GlobalSvg v-if="type == 'delete'" :svg="svg()" />
  </div>
</template>

<script>
export default {
  props: {
    type: { type: String, default: 'edit' },
  },
  methods: {
    svg() {
      let svg = '';
      switch (this.type) {
        case 'add':
          svg = 'save';
          break;
        case 'edit':
          svg = 'pencil';
          break;
        case 'delete':
          svg = 'trash';
          break;
      }
      return svg;
    },
  },
};
</script>

<style lang="postcss" scoped>
.left {
  @apply mx-auto flex flex-shrink-0 items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10;
  &.edit {
    @apply bg-blue-100 text-blue-500;
  }
  &.add {
    @apply bg-green-100 text-green-500;
  }
  &.delete {
    @apply bg-red-100 text-red-500;
  }
  & > svg {
    @apply h-6 w-6;
  }
}
</style>
