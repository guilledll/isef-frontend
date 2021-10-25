<template>
  <form @submit.prevent="updateDepartamento">
    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <div class="sm:flex sm:items-start">
        <ModalLeftIcon />
        <div class="modal-form-body">
          <h3 class="modal-form-heading">Modificar departamento</h3>
          <p class="mb-3">Es posible renombrar el departamento.</p>
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
    <ModalFooter
      text="Modificar departamento"
      :disabled="disabled"
      @close="closeModal"
    />
  </form>
</template>

<script>
import FormValidationMixin from '@/mixins/FormValidationMixin';
import { validationMixin } from 'vuelidate';
import { required, integer, maxLength } from 'vuelidate/lib/validators';
import { updatedDiff } from 'deep-object-diff';
export default {
  mixins: [validationMixin, FormValidationMixin],
  props: {
    isView: { type: Boolean, default: false },
  },
  data() {
    return {
      form: {
        id: '',
        nombre: '',
      },
    };
  },
  computed: {
    departamento() {
      return this.$store.state.departamentos.departamento;
    },
    disabled() {
      return (
        Object.keys(updatedDiff(this.departamento, this.form)).length == 0 ||
        this.form.nombre.length == 0
      );
    },
  },
  mounted() {
    this.form.id = this.departamento.id;
    this.form.nombre = this.departamento.nombre;
  },
  validations: {
    form: {
      id: {
        required,
        integer,
      },
      nombre: {
        required,
        maxLength: maxLength(20),
      },
    },
  },
  methods: {
    updateDepartamento() {
      if (this.invalid()) return;
      this.$store
        .dispatch('departamentos/update', this.form)
        .then(() => this.closeModal())
        .catch((e) => (this.errors = e.response.data.errors));
    },
    closeModal() {
      if (!this.isView) this.$store.dispatch('departamentos/clear');
      this.$emit('close');
    },
  },
};
</script>
