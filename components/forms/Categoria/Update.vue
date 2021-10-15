<template>
  <form @submit.prevent="updateCategoria">
    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <div class="sm:flex sm:items-start">
        <ModalLeftIcon />
        <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <h3 class="modal-form-heading">Modificar categoría</h3>
          <div>
            <FormInput
              id="nombre"
              v-model.trim="form.nombre"
              name="nombre"
              autocomplete="on"
              placeholder="Nombre de la categoría"
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
      text="Modificar categoría"
      :disabled="disabled"
      @close="$emit('close')"
    />
  </form>
</template>

<script>
import InputValidationMixin from '@/mixins/InputValidationMixin';
import { validationMixin } from 'vuelidate';
import { required, numeric, maxLength } from 'vuelidate/lib/validators';
import { updatedDiff } from 'deep-object-diff';
export default {
  mixins: [validationMixin, InputValidationMixin],
  data() {
    return {
      form: {
        id: '',
        nombre: '',
      },
    };
  },
  computed: {
    categoria() {
      return this.$store.state.categorias.categoria;
    },
    disabled() {
      return (
        Object.keys(updatedDiff(this.categoria, this.form)).length == 0 ||
        this.form.nombre.length == 0
      );
    },
  },
  mounted() {
    this.form.id = this.categoria.id;
    this.form.nombre = this.categoria.nombre;
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
    updateCategoria() {
      if (this.invalid) return;

      this.$store
        .dispatch('categorias/update', this.form)
        .then(() => this.$emit('close'))
        .catch((e) => (this.errors = e.response.data.errors));
    },
  },
};
</script>
