<template>
  <div class="mb-3 lg:mb-6 font-1">
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
  },
}
</script>

<style lang="postcss" scoped>
.title {
  @apply text-2xl font-medium mb-2 sm:text-3xl lg:text-4xl;
}
.text {
  @apply text-base font-medium lg:text-lg;
}
</style>
