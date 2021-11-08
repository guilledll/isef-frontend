<template>
  <div id="app-layout" class="w-full h-screen bg-white">
    <div class="bg-white max-w-6xl mx-auto">
      <TopbarExternal />
      <div class="mt-10 mx-auto px-4 sm:px-6 lg:px-8">
        <nuxt />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OutLayout',
  middleware: 'guest',
};
</script>
