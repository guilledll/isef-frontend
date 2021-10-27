<template>
  <div>
    {{ material }}
  </div>
</template>

<script>
export default {
  computed: {
    material() {
      return (
        this.$store.state.materiales.material ||
        this.$store.dispatch('materiales/get', this.$route.params.id)
      );
    },
  },
  mounted() {},
};
</script>
