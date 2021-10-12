<template>
  <form @submit.prevent="updateDeposito">
    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <div class="sm:flex sm:items-start">
        <ModalLeftIcon />
        <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <h3 class="modal-form-heading">Modificar depósito</h3>
          <div>
            <FormInput
              id="nombre"
              v-model.trim="form.nombre"
              name="nombre"
              autocomplete="on"
              placeholder="Nombre del deposito"
              :error="hasError($v.form.nombre, 'nombre')"
              @input="fieldReset($v.form.nombre, 'nombre')"
              @blur="$v.form.nombre.$touch()"
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
    <ModalFooter
      text="Modificar depósito"
      :disabled="disabled"
      @close="closeModal"
    />
  </form>
</template>

<script>
import InputValidationMixin from '@/mixins/InputValidationMixin';
import { validationMixin } from 'vuelidate';
import { required, integer, maxLength } from 'vuelidate/lib/validators';
import { updatedDiff } from 'deep-object-diff';
export default {
  mixins: [validationMixin, InputValidationMixin],
  data() {
    return {
      form: {
        id: '',
        nombre: '',
        departamento_id: '',
      },
      errors: [],
    };
  },
  computed: {
    deposito() {
      return this.$store.state.depositos.deposito;
    },
    disabled() {
      return (
        Object.keys(updatedDiff(this.deposito, this.form)).length == 0 ||
        this.form.nombre.length == 0
      );
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
        integer,
      },
      nombre: {
        required,
        maxLength: maxLength(50),
      },
      departamento_id: {
        required,
        integer,
      },
    },
  },
  methods: {
    updateDeposito() {
      if (this.invalid) return;
      this.$store
        .dispatch('depositos/update', this.form)
        .then(() => this.$emit('close'))
        .catch((e) => (this.errors = e.response.data.errors));
    },
    closeModal() {
      this.$store.dispatch('depositos/clear');
      this.$emit('close');
    },
  },
};
</script>
