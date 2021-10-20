<template>
  <div class="w-full h-screen bg-white">
    <div class="max-w-6xl mx-auto">
      <Topbar />
      <div class="mt-4 mx-auto px-4 sm:px-6 sm:mt-10 lg:px-8">
        <nuxt />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  middleware: ['auth', 'validado.middleware'],
};
</script>
