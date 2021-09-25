<template>
  <div>
    <h1>Index de Materiales</h1>
    {{ materiales }}
    <router-link to="/categorias" class="text-blue-500 hover:text-blue-900"
      >Categorias</router-link
    >
  </div>
</template>

<script>
import MaterialesService from '@/services/materiales.service'
export default {
  layout: 'app.layout',
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
