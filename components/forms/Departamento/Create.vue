<template>
  <form @submit.prevent="createDepartamento">
    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <div class="sm:flex sm:items-start">
        <ModalLeftIcon type="add" />
        <div class="modal-form-body">
          <h3 class="text-xl leading-6 font-medium text-gray-900 mb-3">
            Agregar departamento
          </h3>
          <p class="mb-3">Un nuevo departamento será incluido al sistema.</p>
          <div>
            <FormInput
              id="nombre"
              v-model.trim="form.nombre"
              name="nombre"
              autocomplete="on"
              placeholder="Nombre del departamento"
              :error="hasError($v.form.nombre, 'nombre')"
              @input="fieldReset($v.form.nombre, 'nombre')"
              @blur="touch($v.form.nombre)"
            >
              <LazyFormError
                v-if="hasError($v.form.nombre, 'nombre')"
                :text="errorText($v.form.nombre, 'nombre')"
                :val="errorValidation($v.form.nombre)"
              />
            </FormInput>
          </div>
        </div>
      </div>
    </div>
    <ModalFooter text="Nuevo departamento" type="add" @close="$emit('close')" />
  </form>
</template>

<script>
import InputValidationMixin from '@/mixins/InputValidationMixin';
import { validationMixin } from 'vuelidate';
import { required, maxLength } from 'vuelidate/lib/validators';
export default {
  mixins: [validationMixin, InputValidationMixin],
  data() {
    return {
      form: {
        nombre: '',
      },
    };
  },
  validations: {
    form: {
      nombre: {
        required,
        maxLength: maxLength(50),
      },
    },
  },
  methods: {
    createDepartamento() {
      if (this.invalid()) return;
      this.$store
        .dispatch('departamentos/create', this.form)
        .then(() => this.$emit('close'))
        .catch((e) => (this.errors = e.response.data.errors));
    },
  },
};
</script>
