<template>
  <div class="add-action">
    <div class="body">
      <div class="flex pl-1 lg:block">
        <!-- eslint-disable -->
        <span class="text-sm sm:text-base lg:text-lg" v-html="text">
          {{ text }}
        </span>
      </div>
      <button class="action-btn" @click="$emit('click')">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
          />
        </svg>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 4v16m8-8H4"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: { type: String, default: 'Agregar <b>recurso</b>' },
  },
};
</script>

<style lang="postcss" scoped>
.add-action {
  @apply w-full gap-3 lg:order-last lg:w-72 lg:block;
  & .body {
    @apply flex items-center justify-between h-auto bg-gray-50 border border-green-100 rounded-md p-2 lg:flex-col lg:top-0 lg:sticky lg:border-green-200;
    & .action-btn {
      @apply flex items-center justify-center gap-1 rounded-md text-white h-full px-1.5 py-2 bg-green-600 hover:bg-green-500 sm:py-2.5 sm:px-3.5 lg:gap-0 lg:w-full lg:h-auto lg:mt-3;
    }
  }
}
</style>
