<template>
  <form @submit.prevent="createCategoria">
    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <div class="sm:flex sm:items-start">
        <ModalLeftIcon type="add" />
        <div class="modal-form-body">
          <h3 class="modal-form-heading">Agregar categoría</h3>
          <div>
            <FormInput
              id="nombre"
              v-model.trim="form.nombre"
              name="nombre"
              autocomplete="on"
              placeholder="Nombre de la categoría"
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
    <ModalFooter text="Nueva categoría" type="add" @close="$emit('close')" />
  </form>
</template>

<script>
import FormValidationMixin from '@/mixins/FormValidationMixin';
import { validationMixin } from 'vuelidate';
import { required, maxLength } from 'vuelidate/lib/validators';
export default {
  mixins: [validationMixin, FormValidationMixin],
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
    createCategoria() {
      if (this.invalid()) return;
      this.$store
        .dispatch('categorias/create', this.form)
        .then(() => this.$emit('close'))
        .catch((e) => (this.errors = e.response.data.errors));
    },
  },
};
</script>
