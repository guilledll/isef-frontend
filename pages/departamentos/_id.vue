<template>
  <div>
    {{ departamento }}
  </div>
</template>

<script>
export default {
  middleware: 'admin',
  computed: {
    departamento() {
      return (
        this.$store.state.departamentos.departamento ||
        this.$store.dispatch('departamentos/get', this.$route.params.id)
      );
    },
  },
  mounted() {},
};
</script>
