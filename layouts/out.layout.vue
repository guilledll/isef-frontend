<template>
  <div id="app-layout" class="w-full h-screen bg-white">
    <div class="bg-white max-w-6xl mx-auto">
      <OutTopbar />
      <div class="mt-10 mx-auto px-4 sm:px-6 lg:px-8">
        <nuxt />
      </div>
    </div>
  </div>
</template>

<script>
import OutTopbar from '@/components/topbar/OutTopbar.vue'
export default {
  components: {
    OutTopbar,
  },
  middleware: 'guest.middleware',
}
</script>
