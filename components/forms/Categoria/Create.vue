<template>
  <form @submit.prevent="createCategoria">
    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <div class="sm:flex sm:items-start">
        <ModalLeftIcon type="add" />
        <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <h3 class="text-lg leading-6 font-medium text-gray-900 mb-3">
            Agregar categoria
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
              placeholder="nombre de categoria"
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
    <ModalFooter text="Nueva categoria" type="add" @close="$emit('close')" />
  </form>
</template>

<script>
import { mensajes } from '@/services/validation.service';
import { validationMixin } from 'vuelidate';
import { validationMessage } from 'vuelidate-messages';
import { required, maxLength } from 'vuelidate/lib/validators';
export default {
  mixins: [validationMixin],
  data() {
    return {
      categoria: {
        nombre: '',
      },
      error: null,
    };
  },
  validations: {
    categoria: {
      nombre: {
        required,
        maxLength: maxLength(50),
      },
    },
  },
  methods: {
    validar: validationMessage(mensajes),
    createCategoria() {
      this.$v.categoria.$touch();
      if (this.$v.$invalid) return;
      this.$store
        .dispatch('categorias/create', this.categoria)
        .then(() => this.$emit('close'))
        .catch((e) => (this.error = e.response.data.errors));
    },
  },
};
</script>
