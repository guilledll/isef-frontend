<template>
  <div class="mb-5">
    <hr class="my-4" />
    <label for="filtro" class="font-1">
      <GlobalSvg class="h-6 w-6 mr-1 inline text-blue-500" svg="search" />
      Filtrar por {{ title }}
    </label>
    <div class="flex mt-2 cont" :class="{ 'gap-3': id != 0 }">
      <FormSelect id="filtro" v-model="id" name="filtro" @change="filtrar">
        <template #options>
          <option value="0" :selected="!id">Seleccionar {{ title }}</option>
          <option v-for="d in data" :key="d.id" :value="d.id">
            {{ d.nombre }}
          </option>
        </template>
      </FormSelect>
      <div v-if="id != 0" class="clear-btn" @click="limpiar">
        <GlobalSvg class="h-5 w-5 text-red-500" svg="trash" />
      </div>
    </div>
    <!-- INPUTS PARA SELECCIONAR -->
    <div v-if="inputs.length" class="flex gap-3 mt-1">
      <div v-for="(input, i) in inputs" :key="i">
        <input
          :id="`filtro-${i}`"
          v-model="contenido"
          :name="`filtro-${i}`"
          type="radio"
          :checked="input.value == contenido"
          :value="input.value"
          @change="cambiarFiltro"
        />
        <label :for="`filtro-${i}`">{{ input.text }}</label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    inputs: { type: Array, default: () => [] },
    data: { type: Array, default: () => [] },
    store: { type: String, default: '' },
    title: { type: String, default: '' },
  },
  data() {
    return {
      contenido: null,
      id: 0,
    };
  },
  mounted() {
    // Si hay inputs checkea el primero
    if (this.inputs.length) {
      this.contenido = this.inputs[0].value;
    }
  },
  methods: {
    filtrar() {
      if (this.id == 0) {
        this.limpiar();
      } else {
        this.$store.dispatch(`${this.store}/filtrar`, {
          id: this.id,
          contenido: this.contenido,
        });
        this.$emit('filtrar');
      }
    },
    cambiarFiltro() {
      this.id = 0; //Limpia select
      this.$emit('cambiar', this.contenido);
    },
    limpiar() {
      this.id = 0; //Limpia select
      this.$emit('limpiar');
    },
  },
};
</script>

<style lang="postcss" scoped>
.clear-btn {
  @apply flex items-center justify-center border border-gray-300 rounded-lg p-2 h-11 w-11 cursor-pointer hover:bg-red-50 hover:text-red-700;
}
.cont ::v-deep div:first-child {
  @apply flex-grow;
}
</style>
