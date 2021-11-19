<template>
  <div class="mb-6">
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
  </div>
</template>

<script>
export default {
  props: {
    input: { type: Array, default: () => [] },
    data: { type: Array, default: () => [] },
    store: { type: String, default: '' },
    title: { type: String, default: '' },
  },
  data() {
    return {
      contenido: '',
      id: 0,
    };
  },
  methods: {
    filtrar() {
      if (this.id == 0) {
        this.limpiar();
      } else {
        this.$store.dispatch(`${this.store}/filtrar`, {
          id: this.id,
        });
        this.$emit('filtrar');
      }
    },
    limpiar() {
      this.id = 0;
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
