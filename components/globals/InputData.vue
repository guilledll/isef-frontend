<template>
  <div class="input-data">
    <GlobalSvg :class="color" :svg="svg" />
    <div>
      <span>{{ title }}</span>
      <p>{{ value }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: { type: [String, Number], default: 'Valor' },
    color: { type: String, default: 'blue' },
    title: { type: String, default: 'Info' },
    svg: { type: String, default: 'check' },
  },
};
</script>

<style lang="postcss" scoped>
.input-data {
  @apply flex items-start gap-3 sm:gap-2;
  svg {
    @apply h-5 w-5 flex-shrink-0 sm:h-6 sm:w-6;
    &.indigo {
      @apply text-indigo-500;
    }
    &.blue {
      @apply text-blue-500;
    }
    &.purple {
      @apply text-purple-500;
    }
    &.green {
      @apply text-green-500;
    }
    &.red {
      @apply text-red-500;
    }
    &.pink {
      @apply text-pink-500;
    }
    &.gray {
      @apply text-gray-500;
    }
    &.yellow {
      @apply text-yellow-500;
    }
  }
  div {
    @apply space-y-1.5;
    span {
      @apply font-semibold text-gray-700 pb-[2px] border-b mr-1 sm:m-0;
    }
    p {
      @apply inline sm:block;
    }
  }
}
</style>
