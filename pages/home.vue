<template>
  <div>
    Home
    <button class="btn-indigo" @click="logout">Chau</button>
  </div>
</template>

<script>
export default {
  layout: 'App',
  middleware: 'auth',
  methods: {
    async logout() {
      await this.$auth.logout()
      this.$router.push('/')
    },
  },
}
</script>

<style></style>
