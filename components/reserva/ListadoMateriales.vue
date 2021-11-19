<template>
  <div class="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
    <div
      v-for="mat in materialesDisponibles"
      :key="mat.id"
      class="material-card"
      :class="{ reservado: reservado(mat.id) }"
    >
      <div>
        <p class="title font-1">{{ mat.nombre }}, {{ mat.categoria }}</p>
        <p class="text-gray-500 text-base">Disponible: {{ mat.cantidad }}</p>
      </div>
      <div
        class="flex items-center"
        :class="reservado(mat.id) ? 'justify-between mt-1.5' : 'justify-end'"
      >
        <div
          v-if="reservado(mat.id)"
          class="cart-action del"
          @click="gestionMaterial(mat, 'del')"
        >
          <GlobalSvg svg="trash" class="h-auto w-auto" />
        </div>
        <div
          v-else
          class="cart-action add"
          @click="gestionMaterial(mat, 'add')"
        >
          <GlobalSvg svg="clipboard-check" class="h-auto w-auto" />
        </div>
        <LazyFormCounter
          v-if="reservado(mat.id)"
          :max-cant="mat.cantidad"
          @cambio="(cant) => cambiarCantidad(mat.id, cant)"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    materialesDisponibles: { type: Array, default: () => [] },
  },
  data() {
    return {
      selectedMaterial: null,
    };
  },
  computed: {
    material() {
      return this.$store.getters['reservas/material'](this.selectedMaterial);
    },
  },
  methods: {
    async gestionMaterial(mat, action = 'add') {
      this.selectedMaterial = mat.id;
      if (action == 'add') {
        // Si el material no existe lo agrego
        if (!this.material || this.material.id != mat.id) {
          await this.$store.dispatch('reservas/agregarMaterial', mat);
        }
      } else {
        await this.$store.dispatch('reservas/removerMaterial', mat.id);
      }
      this.selectedMaterial = null;
    },
    reservado(id) {
      return this.$store.getters['reservas/material'](id) ? true : false;
    },
    cambiarCantidad(id, cant) {
      this.$store.dispatch('reservas/cantidadMaterial', { id: id, cant: cant });
    },
  },
};
</script>

<style lang="postcss" scoped>
.material-card {
  @apply flex flex-col justify-between px-4 py-3 border rounded-lg bg-gray-50 max-h-80 hover:bg-gray-100;
  &.reservado {
    @apply border-green-400 shadow;
  }
  .title {
    @apply text-lg text-gray-800 capitalize mb-0.5;
  }
  .cart-action {
    @apply h-10 w-10 p-1.5 flex items-center rounded-full cursor-pointer hover:shadow;
    &.add {
      @apply bg-green-100 text-green-600 hover:bg-green-200;
    }
    &.del {
      @apply bg-red-100 text-red-500 hover:bg-red-200;
    }
  }
}
</style>
