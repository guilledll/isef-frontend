<template>
  <div>
    {{ deposito }}
  </div>
</template>

<script>
export default {
  middleware: 'admin',
  computed: {
    deposito() {
      return (
        this.$store.state.depositos.deposito ||
        this.$store.dispatch('depositos/get', this.$route.params.id)
      );
    },
  },
  mounted() {},
};
</script>
