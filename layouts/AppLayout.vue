<template>
  <div class="flex flex-col w-full h-screen bg-white max-w-6xl mx-auto">
    <Topbar />
    <div class="my-auto mt-4 px-4 sm:mt-10">
      <nuxt />
    </div>
    <GlobalFooter />
  </div>
</template>
<script>
export default {
  name: 'AppLayout',
  middleware: ['auth', 'validado'],
};
</script>
