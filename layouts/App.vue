<template>
  <div id="app-layout" class="w-full h-screen bg-white">
    <AppHeader v-if="showHeader" />
    <nuxt />
  </div>
</template>
<script>
import AppHeader from '@/components/global/AppHeader'
export default {
  layout: 'App',
  components: {
    AppHeader,
  },
  data() {
    return {}
  },
  computed: {
    showHeader() {
      let pages = [] // Paginas en las que no se debe mostar la cabecera
      return pages.indexOf(this.$route.name) == -1
    },
  },
}
</script>
