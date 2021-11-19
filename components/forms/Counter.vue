<template>
  <div class="body">
    <label for="cantidad" class="form-label font-1" :class="{ 'sr-only': sr }">
      {{ label }}
    </label>
    <div class="counter">
      <button type="button" class="boton minus" @click="restar">
        <GlobalSvg svg="minus" class="h-5 w-5" />
      </button>
      <input
        id="cantidad"
        v-model="cantidad"
        name="cantidad"
        type="number"
        class="input"
        disabled
      />
      <button type="button" class="boton plus" @click="sumar">
        <GlobalSvg svg="plus" class="h-5 w-5" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cant: { type: Number, default: 1 },
    maxCant: { type: Number, default: 50 },
    sr: { type: Boolean, default: true },
    label: { type: String, default: 'Cantidad' },
  },
  data() {
    return {
      cantidad: 0,
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.cantidad = this.cant;
    });
  },
  methods: {
    sumar() {
      if (this.cantidad < this.maxCant) {
        this.cantidad += 1;
        this.$emit('cambio', this.cantidad);
      }
    },
    restar() {
      if (this.cantidad > 1) {
        this.cantidad -= 1;
        this.$emit('cambio', this.cantidad);
      }
    },
  },
};
</script>

<style lang="postcss" scoped>
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
}
.body {
  @apply max-w-[140px];
  .counter {
    @apply flex items-center justify-center rounded-lg;
    .boton {
      @apply h-10 px-3 bg-white cursor-pointer border-t border-b border-gray-300;
      &.plus {
        @apply text-green-600 border-r rounded-r-md hover:text-green-700 hover:bg-green-50;
      }
      &.minus {
        @apply text-red-600 border-l rounded-l-md hover:text-red-700 hover:bg-red-50;
      }
    }
    .input {
      @apply flex items-center w-full h-10 bg-white font-semibold text-center border-t border-b border-gray-300;
    }
  }
}
</style>
