<template>
  <div>
    <button class="btn indigo" @click="logout">Chau</button>
    <router-link class="btn green" to="/admin"> Admin </router-link>
  </div>
</template>

<script>
export default {
  layout: 'app.layout',
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
