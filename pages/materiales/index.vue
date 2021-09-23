<template>
  <div>
    <h1>Index de Materiales</h1>
    {{ materiales }}
  </div>
</template>

<script>
import MaterialesService from '@/services/materiales.service'
export default {
  layout: 'App',
  middleware: 'auth',
  data() {
    return {
      materiales: {},
    }
  },
  mounted() {
    MaterialesService.index().then((res) => {
      this.materiales = res.data
    })
  },
  methods: {},
}
</script>

<style></style>
