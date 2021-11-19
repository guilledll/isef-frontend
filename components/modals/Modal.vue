<template>
  <div class="fixed z-10 inset-0 overflow-y-auto">
    <div
      class="
        flex
        items-end
        justify-center
        min-h-screen
        p-4
        text-center
        sm:block
      "
    >
      <div class="fixed inset-0 bg-gray-500 opacity-75"></div>
      <span
        class="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true"
        >&#8203;</span
      >
      <div
        class="
          inline-block
          align-bottom
          bg-white
          rounded-lg
          text-left
          overflow-hidden
          shadow-xl
          transform
          transition-all
          my-auto
          w-full
          sm:align-middle sm:max-w-lg
          md:mx-auto
        "
      >
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
