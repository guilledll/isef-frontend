<template>
  <div class="grid grid-cols-2 gap-2 place-content-center">
    <div class="button blue" @click="goTo('inicio')">Gestionar usuarios</div>
    <div class="button green" @click="goTo('inicio')">mostrar informes</div>
    <div class="button green" @click="goTo('inicio')">mostrar reservas</div>
    <div class="blue button" @click="goTo('materiales')">
      gestionar materiales
    </div>
    <div class="blue button" @click="goTo('depositos')">
      gestionar depositos
    </div>
  </div>
</template>

<script>
export default {
  layout: 'app.layout',
  methods: {
    goTo(ruta) {
      this.$router.push(`/${ruta}`);
    },
  },
};
</script>
<style lang="postcss" scoped>
.button {
  @apply text-white font-bold uppercase text-3xl rounded shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 flex items-center h-40 justify-center;
  &.blue {
    @apply bg-blue-500 active:bg-blue-600;
  }
  &.green {
    @apply bg-green-500 active:bg-green-600;
  }
}
</style>
