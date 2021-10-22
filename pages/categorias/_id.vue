<template>
  <div>
    {{ categoria }}
  </div>
</template>

<script>
export default {
  middleware: 'admin',
  computed: {
    categoria() {
      return (
        this.$store.state.categorias.categoria ||
        this.$store.dispatch('categorias/get', this.$route.params.id)
      );
    },
  },
};
</script>
