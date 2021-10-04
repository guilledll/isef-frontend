<template>
  <form @submit.prevent="updateDeposito">
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
              v-model.trim="form.nombre"
              name="nombre"
              autocomplete="on"
              placeholder="Nombre del depósito"
              :error="$v.form.nombre.$anyError"
              @input="$v.form.nombre.$reset()"
              @blur="$v.form.nombre.$touch()"
            />
            <span v-if="$v.form.nombre.$anyError" class="error">
              {{ validar($v.form.nombre) }}
            </span>
          </div>
          <input type="hidden" name="id" :value="form.id" />
        </div>
      </div>
    </div>
    <ModalFooter
      text="Modificar depósito"
      :disabled="disabled"
      @close="$emit('close')"
    />
  </form>
</template>

<script>
import { mensajes } from '@/services/validation.service';
import { validationMixin } from 'vuelidate';
import { validationMessage } from 'vuelidate-messages';
import { required, numeric, maxLength } from 'vuelidate/lib/validators';
import { updatedDiff } from 'deep-object-diff';
export default {
  mixins: [validationMixin],
  data() {
    return {
      error: null,
      form: {
        id: '',
        nombre: '',
        departamento_id: '',
      },
    };
  },
  computed: {
    deposito() {
      return this.$store.state.depositos.deposito;
    },
    disabled() {
      return Object.keys(updatedDiff(this.deposito, this.form)).length == 0;
    },
  },
  mounted() {
    this.form.id = this.deposito.id;
    this.form.nombre = this.deposito.nombre;
    this.form.departamento_id = this.deposito.departamento_id;
  },
  validations: {
    form: {
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
    updateDeposito() {
      if (this.$v.invalid) return;
      this.$store
        .dispatch('depositos/update', this.form)
        .then(() => this.$emit('close'))
        .catch((e) => (this.error = e.response.data.errors));
    },
  },
};
</script>
