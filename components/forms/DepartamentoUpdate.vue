<template>
  <form @submit.prevent="updatedepartamento">
    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <div class="sm:flex sm:items-start">
        <ModalLeftIcon />
        <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <h3 class="text-lg leading-6 font-medium text-gray-900 mb-3">
            Modificar departamento
          </h3>
          <p v-if="error && error.nombre" class="text-red-500 font-medium mb-1">
            {{ error.nombre[0] }}
          </p>
          <div>
            <FormInput
              id="nombre"
              v-model.trim="departamento.nombre"
              name="nombre"
              autocomplete="on"
              placeholder="nombre de departamento"
              :error="$v.departamento.nombre.$anyError"
              @input="$v.departamento.nombre.$reset()"
              @blur="$v.departamento.nombre.$touch()"
            />
            <span v-if="$v.departamento.nombre.$anyError" class="error">
              {{ validar($v.departamento.nombre) }}
            </span>
          </div>
          <input type="hidden" name="id" :value="departamento.id" />
        </div>
      </div>
    </div>
    <ModalFooter
      text="Modificar departamento"
      :disabled="disabled"
      @close="$emit('close')"
    />
  </form>
</template>

<script>
import departamentoService from '@/services/departamento.service';
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
      departamento: {
        id: '',
        nombre: '',
        departamento_id: '',
      },
    };
  },
  computed: {
    disabled() {
      return (
        Object.keys(updatedDiff(this.model, this.departamento)).length == 0
      );
    },
  },
  mounted() {
    // this.departamento = this.model
    this.departamento.id = this.model.id;
    this.departamento.nombre = this.model.nombre;
  },
  validations: {
    departamento: {
      id: {
        required,
        numeric,
      },
      nombre: {
        required,
        maxLength: maxLength(20),
      },
    },
  },
  methods: {
    validar: validationMessage(mensajes),
    updatedepartamento() {
      if (this.$v.invalid) return;
      departamentoService
        .update(this.departamento.id, this.departamento)
        .then(() => {
          // IMPLEMENTAR ESTO EN LA STORE
          // let departamento = this.departamentos.find((dep) => dep.id === data.id)
          // departamento.nombre = data.nombre
          this.$emit('close');
        })
        .catch((e) => {
          this.error = e.response.data.errors;
        });
    },
  },
};
</script>
