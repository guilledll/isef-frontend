<template>
  <div class="w-full h-screen bg-white">
    <div class="max-w-6xl mx-auto">
      <div class="px-4 py-3 sm:pt-6 sm:px-6 lg:px-8">
        <nav class="flex items-center justify-center w-full md:w-auto">
          <router-link
            to="/"
            class="
              text-gray-900 text-3xl
              md:text-4xl
              tracking-tight
              font-semibold
              flex
              items-center
            "
          >
            <img
              src="/img/isef.png"
              alt="isef"
              class="h-8 inline mr-3 sm:h-12 sm:mr-3.5"
            />
            ISEF
          </router-link>
        </nav>
        <div class="flex items-center justify-center flex-col">
          <div class="card font-1">
            El equipo de ISEF recibió tu solicitúd de ingreso, te notificaremos
            al correo cuando sea validada!
          </div>
          <img
            src="/svg/New_notifications.svg"
            alt="Revisión de perfil"
            class="h-60 my-24 m-auto"
          />
          <button class="btn gray" @click="logout">Cerrar sesión</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  middleware: 'auth',
  methods: {
    logout() {
      this.$auth.logout();
    },
  },
};
</script>

<style lang="postcss" scoped>
.card {
  @apply flex border border-green-400 rounded-xl bg-green-100 p-5 mt-12 text-green-900 font-semibold text-lg;
}
</style>
