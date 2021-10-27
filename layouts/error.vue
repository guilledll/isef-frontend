<template>
  <div class="flex flex-col justify-center items-center my-auto h-screen">
    <h1 v-if="error.statusCode === 404" class="text-gray-700 font-1 text">
      Página no encontrada
    </h1>
    <h1 v-else class="text-red-500 font-1 text">Ocurrió un error</h1>
    <img
      src="/svg/404.svg"
      alt="Revisión de perfil"
      class="h-40 my-8 m-auto md:h-52 md:my-16"
    />
    <NuxtLink class="action-btn" to="/"> Volver al inicio </NuxtLink>
  </div>
</template>

<script>
export default {
  props: {
    error: { type: Object, default: () => {} },
  },
};
</script>

<style lang="postcss" scoped>
.text {
  @apply text-2xl md:text-4xl;
}
.action-btn {
  @apply py-2 px-3 text-lg rounded-lg hover:text-purple-700 hover:bg-gray-100;
}
</style>
