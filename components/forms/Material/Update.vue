<template>
  <form @submit.prevent="updateMaterial">
    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <div class="sm:flex sm:items-start">
        <ModalLeftIcon />
        <div class="modal-form-body">
          <h3 class="modal-form-heading">Modificar material</h3>
          <p class="mb-3">Cambiar información del material.</p>
          <div class="space-y-2">
            <!--Nombre -->
            <div>
              <FormInput
                id="nombre"
                v-model.trim="form.nombre"
                name="nombre"
                autocomplete="on"
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
            <!--Depósito -->
            <div>
              <FormSelect
                id="deposito_id"
                v-model.trim="form.deposito_id"
                name="deposito_id"
                :error="hasError($v.form.deposito_id)"
                @input="fieldReset($v.form.deposito_id)"
                @blur="touch($v.form.deposito_id)"
                @change="selectDeposito"
              >
                <template #options>
                  <option
                    v-for="deposito in depositos"
                    :key="deposito.id"
                    :value="deposito.id"
                    :selected="form.deposito_id == deposito.id"
                  >
                    {{ deposito.nombre }}
                  </option>
                </template>
                <template #error>
                  <LazyFormError
                    v-if="hasError($v.form.deposito_id)"
                    :text="errorText($v.form.deposito_id)"
                  />
                </template>
              </FormSelect>
            </div>
            <!--Categoria -->
            <div>
              <FormSelect
                id="categoria_id"
                v-model.trim="form.categoria_id"
                name="categoria_id"
                :error="hasError($v.form.categoria_id)"
                @input="fieldReset($v.form.categoria_id)"
                @blur="touch($v.form.categoria_id)"
                @change="selectCategoria"
              >
                <template #options>
                  <option
                    v-for="categoria in categorias"
                    :key="categoria.id"
                    :value="categoria.id"
                    :selected="form.categoria_id == categoria.id"
                  >
                    {{ categoria.nombre }}
                  </option>
                </template>
                <template #error>
                  <LazyFormError
                    v-if="hasError($v.form.deposito_id)"
                    :text="errorText($v.form.deposito_id)"
                  />
                </template>
              </FormSelect>
            </div>
            <!--Cantidad -->
            <FormCounter :cant="form.cantidad" @updateCant="updateCantidad" />
          </div>
        </div>
      </div>
    </div>
    <ModalFooter
      text="Modificar material"
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
  data() {
    return {
      form: {
        id: '',
        nombre: '',
        deposito_id: '',
        categoria_id: '',
        cantidad: 0,
        usuario_ci: this.$auth.user.ci,
      },
    };
  },
  computed: {
    material() {
      return this.$store.state.materiales.material;
    },
    depositos() {
      return this.$store.state.depositos.depositos.length
        ? this.$store.state.depositos.depositos
        : this.$store.dispatch('depositos/all');
    },
    categorias() {
      return this.$store.state.categorias.categorias.length
        ? this.$store.state.categorias.categorias
        : this.$store.dispatch('categorias/all');
    },
    disabled() {
      return (
        Object.keys(updatedDiff(this.material, this.form)).length == 0 ||
        this.form.nombre.length == 0
      );
    },
  },
  mounted() {
    this.form.id = this.material.id;
    this.form.nombre = this.material.nombre;
    this.form.deposito_id = this.material.deposito_id;
    this.form.categoria_id = this.material.categoria_id;
    this.form.cantidad = this.material.cantidad;
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
      deposito_id: {
        integer,
      },
      categoria_id: {
        integer,
      },
      cantidad: {
        integer,
      },
    },
  },
  methods: {
    selectDeposito(value) {
      this.form.deposito_id = value;
    },
    selectCategoria(value) {
      this.form.categoria_id = value;
    },
    updateCantidad(cantidad) {
      this.form.cantidad = cantidad;
    },
    updateMaterial() {
      if (this.invalid()) return;
      this.$store
        .dispatch('materiales/update', this.form)
        .then(() => this.$emit('close'))
        .catch((e) => (this.errors = e.response.data.errors));
    },
    closeModal() {
      this.$store.dispatch('materiales/clear');
      this.$emit('close');
    },
  },
};
</script>
