<template>
  <div class="left" :class="type">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6"
      :class="type"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        v-if="type == 'mod'"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
      />
      <path
        v-if="type == 'add'"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
      />
    </svg>
  </div>
</template>

<script>
export default {
  props: {
    type: { type: String, default: 'mod' },
  },
};
</script>

<style lang="postcss" scoped>
.left {
  @apply mx-auto flex flex-shrink-0 items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10;
  &.mod {
    @apply bg-blue-100;
  }
  &.add {
    @apply bg-green-100;
  }
  &.del {
    @apply bg-red-100;
  }
  & > svg {
    &.mod {
      @apply text-blue-500;
    }
    &.add {
      @apply text-green-500;
    }
    &.del {
      @apply text-red-500;
    }
  }
}
</style>
