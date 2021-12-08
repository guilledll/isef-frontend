<template>
  <form @submit.prevent="createDeposito">
    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <div class="sm:flex sm:items-start">
        <ModalLeftIcon type="add" />
        <div class="modal-form-body">
          <h3 class="modal-form-heading">Agregar depósito</h3>
          <p class="mb-3">Se creará un nuevo depósitos para los materiales.</p>
          <div class="space-y-2">
            <div>
              <FormInput
                id="nombre"
                v-model.trim="form.nombre"
                name="nombre"
                autocomplete="on"
                placeholder="Nombre del deposito"
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
            <div>
              <FormSelect
                id="departamento_id"
                v-model.number="form.departamento_id"
                name="departamento_id"
                required
                :error="hasError($v.form.departamento_id)"
                @input="fieldReset($v.form.departamento_id)"
                @blur="touch($v.form.departamento_id)"
                @change="selectDepartamento"
              >
                <template #options>
                  <option value="0">Seleccionar departamento</option>
                  <option
                    v-for="departamento in departamentos"
                    :key="departamento.id"
                    :value="departamento.id"
                  >
                    {{ departamento.nombre }}
                  </option>
                </template>
                <template #error>
                  <LazyFormError
                    v-if="hasError($v.form.departamento_id)"
                    :text="errorText($v.form.departamento_id)"
                  />
                </template>
              </FormSelect>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ModalFooter text="Nuevo depósito" type="add" @close="$emit('close')" />
  </form>
</template>

<script>
import FormValidationMixin from '@/mixins/FormValidationMixin';
import { departamento } from '@/services/validation.service';
import { validationMixin } from 'vuelidate';
import { required, integer, maxLength } from 'vuelidate/lib/validators';
export default {
  mixins: [validationMixin, FormValidationMixin],
  data() {
    return {
      form: {
        nombre: '',
        departamento_id: 0,
      },
    };
  },
  computed: {
    departamentos() {
      return this.$store.state.departamentos.departamentos.length
        ? this.$store.state.departamentos.departamentos
        : this.$store.dispatch('departamentos/all');
    },
  },
  validations: {
    form: {
      nombre: {
        required,
        maxLength: maxLength(50),
      },
      departamento_id: {
        required,
        integer,
        departamento,
      },
    },
  },
  methods: {
    createDeposito() {
      if (this.invalid()) return;
      this.$store
        .dispatch('depositos/create', this.form)
        .then(() => this.$emit('close'))
        .catch((e) => (this.errors = e.response.data.errors));
    },
    selectDepartamento(value) {
      this.form.departamento = value;
    },
  },
};
</script>
