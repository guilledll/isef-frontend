<template>
  <form @submit.prevent="updateCategoria">
    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <div class="sm:flex sm:items-start">
        <ModalLeftIcon />
        <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <h3 class="text-lg leading-6 font-medium text-gray-900 mb-3">
            Modificar depósito
          </h3>
          <p v-if="error && error.nombre" class="text-red-500 font-medium mb-1">
            {{ error.nombre[0] }}
          </p>
          <div>
            <FormInput
              id="nombre"
              v-model.trim="categoria.nombre"
              name="nombre"
              autocomplete="on"
              placeholder="Nombre de categoría"
              :error="$v.categoria.nombre.$anyError"
              @input="$v.categoria.nombre.$reset()"
              @blur="$v.categoria.nombre.$touch()"
            />
            <span v-if="$v.categoria.nombre.$anyError" class="error">
              {{ validar($v.categoria.nombre) }}
            </span>
          </div>
          <input type="hidden" name="id" :value="categoria.id" />
        </div>
      </div>
    </div>
    <ModalFooter
      text="Modificar categoría"
      :disabled="disabled"
      @close="$emit('close')"
    />
  </form>
</template>

<script>
import CategoriaService from '@/services/categoria.service';
import { mensajes } from '@/services/validation.service';
import { validationMixin } from 'vuelidate';
import { validationMessage } from 'vuelidate-messages';
import { required, numeric, maxLength } from 'vuelidate/lib/validators';
import { updatedDiff } from 'deep-object-diff';
export default {
  mixins: [validationMixin],
  props: {
    model: { type: Object, default: () => {} },
  },
  data() {
    return {
      error: null,
      categoria: {
        id: '',
        nombre: '',
      },
    };
  },
  computed: {
    disabled() {
      return Object.keys(updatedDiff(this.model, this.categoria)).length == 0;
    },
  },
  mounted() {
    this.categoria.id = this.model.id;
    this.categoria.nombre = this.model.nombre;
  },
  validations: {
    categoria: {
      id: {
        required,
        numeric,
      },
      nombre: {
        required,
        maxLength: maxLength(50),
      },
    },
  },
  methods: {
    validar: validationMessage(mensajes),
    updateCategoria() {
      if (this.$v.invalid) return;
      CategoriaService.update(this.categoria.id, this.categoria)
        .then(() => {
          // IMPLEMENTAR ESTO EN LA STORE
          // let categoria = this.depositos.find((dep) => dep.id === data.id)
          // categoria.nombre = data.nombre
          this.$emit('close');
        })
        .catch((e) => {
          this.error = e.response.data.errors;
        });
    },
  },
};
</script>
