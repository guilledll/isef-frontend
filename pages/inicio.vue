<template>
  <div>
    <button class="btn indigo" @click="logout">Chau</button>
  </div>
</template>

<script>
export default {
  layout: 'App',
  middleware: 'auth',
  computed: {
    user() {
      return this.$auth.user
    },
  },
  methods: {
    async logout() {
      await this.$auth.logout()
    },
  },
}
</script>

<style></style>
