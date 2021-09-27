<template>
  <div class="header" :class="[color, bg]">
    <h4 class="title">{{ title }}</h4>
    <span class="text">
      {{ text }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, default: 'Titulo de la página' },
    text: { type: String, default: 'Breve descripción de la página' },
    color: { type: String, default: 'text-white' },
    bg: { type: String, default: 'bg-indigo-600' },
  },
}
</script>

<style lang="postcss" scoped>
.header {
  @apply px-4 py-3 mb-3 w-full rounded-md sm:px-8 sm:py-6;
  & > .title {
    @apply font-medium text-2xl mb-1 sm:mb-5 sm:text-3xl;
  }
  & > .text {
    @apply text-sm font-medium sm:text-lg;
  }
}
</style>
