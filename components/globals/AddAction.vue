<template>
  <div class="action" :class="color">
    <div class="flex pl-1 lg:block">
      <!-- eslint-disable-next-line -->
      <span class="text-sm sm:text-base lg:text-lg" v-html="text">
        {{ text }}
      </span>
    </div>
    <button :class="color" @click="$emit('click')">
      <div v-if="svg == 'add'" class="flex items-center">
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
      </div>
      <div v-if="svg == 'departamento'" class="flex items-center gap-0.5">
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
            d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
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
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      </div>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    text: { type: String, default: 'Acción <b>recurso</b>' },
    color: { type: String, default: 'green' },
    svg: { type: String, default: 'add' },
  },
};
</script>

<style lang="postcss" scoped>
.action {
  @apply flex items-center justify-between h-auto bg-gray-50 border rounded-md p-2 lg:flex-col lg:top-0 lg:sticky;
  &.green {
    @apply border-green-200;
  }
  &.indigo {
    @apply border-indigo-300;
  }
  & > button {
    @apply flex items-center justify-center gap-1 rounded-md text-white h-full px-3.5 py-2 sm:py-2.5 lg:gap-0 lg:w-full lg:h-auto lg:mt-2;
    &.green {
      @apply bg-green-600 hover:bg-green-500;
    }
    &.indigo {
      @apply bg-indigo-600 hover:bg-indigo-500;
    }
  }
}
</style>
