<template>
  <div>
    {{ usuario }}
  </div>
</template>

<script>
export default {
  computed: {
    usuario() {
      return (
        this.$store.state.users.user ||
        this.$store.dispatch('users/get', this.$route.params.id)
      );
    },
  },
  mounted() {},
};
</script>
