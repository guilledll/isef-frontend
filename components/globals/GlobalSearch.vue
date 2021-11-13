<template>
  <div class="mb-8">
    <hr class="my-4" />
    <label for="filtro" class="font-1">
      <GlobalSvg class="h-6 w-6 mr-1 inline text-blue-500" svg="search" />
      Filtrar por {{ title }}
    </label>
    <FormSelect
      id="filtro"
      v-model.trim="id"
      class="mt-2"
      name="filtro"
      @change="filtrar"
    >
      <template #options>
        <option value="0">Seleccionar {{ title }}</option>
        <option v-for="d in data" :key="d.id" :value="d.id">
          {{ d.nombre }}
        </option>
      </template>
    </FormSelect>
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
      id: 1,
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
      this.$emit('limpiar');
    },
  },
};
</script>

<style></style>
