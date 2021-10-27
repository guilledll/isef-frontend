<template>
  <div class="custom-number-input h-10 w-32">
    <label
      for="custom-input-number"
      class="w-full text-gray-700 text-sm font-semibold"
      >Modificar Cantidad
    </label>
    <div
      class="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1"
    >
      <button type="button" class="boton" @click="decrement()">
        <span class="m-auto text-2xl font-thin">−</span>
      </button>

      <input
        v-model="cantidad"
        type="number"
        class="input"
        name="custom-input-number"
      />

      <button type="button" class="boton" @click="increment()">
        <span class="m-auto text-2xl font-thin">+</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cant: { type: Number, default: 0 },
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
    increment() {
      this.cantidad += 1;
      this.$emit('updateCant', this.cantidad);
    },
    decrement() {
      if (this.cantidad > 0) {
        this.cantidad -= 1;
        this.$emit('updateCant', this.cantidad);
      }
    },
  },
};
</script>

<style lang="postcss" scoped>
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.custom-number-input input:focus {
  outline: none !important;
}
.custom-number-input button:focus {
  outline: none !important;
}
.boton {
  @apply bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none;
}
.input {
  @apply outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold hover:text-black focus:text-black  flex items-center text-gray-700;
}
</style>
