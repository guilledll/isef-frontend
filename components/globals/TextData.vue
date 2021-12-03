<template>
  <div class="flex items-center text-lg md:text-xl">
    <span class="flex items-center mr-1.5 font-semibold text-gray-800">
      <GlobalSvg class="h-6 w-6 mr-1" :class="color" :svg="svg" />
      {{ title }}
    </span>
    <router-link v-if="link" class="link" :to="link">
      {{ text }}
    </router-link>
    <span v-else>{{ text }}</span>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, default: 'Título' },
    text: { type: [String, Number], default: 'Valor' },
    color: { type: String, default: 'blue' },
    svg: { type: String, default: 'user' },
    link: { type: String, default: '' },
  },
};
</script>

<style lang="postcss" scoped>
.link {
  @apply hover:text-blue-500 hover:underline;
}
.blue {
  @apply text-blue-600;
}
.purple {
  @apply text-purple-600;
}
.indigo {
  @apply text-indigo-600;
}
.green {
  @apply text-green-600;
}
.yellow {
  @apply text-yellow-600;
}
.red {
  @apply text-red-600;
}
.gray {
  @apply text-gray-600;
}
</style>
