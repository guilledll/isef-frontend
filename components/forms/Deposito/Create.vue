<template>
  <form @submit.prevent="createDeposito">
    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <div class="sm:flex sm:items-start">
        <ModalLeftIcon type="add" />
        <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
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
                @blur="$v.form.nombre.$touch()"
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
                v-model.trim="form.departamento_id"
                name="departamento_id"
                required
                :error="hasError($v.form.departamento_id)"
                @input="fieldReset($v.form.departamento_id)"
                @blur="$v.form.departamento_id.$touch()"
                @change="selectDepartamento"
              >
                <template #options>
                  <option value="0">Seleccionar sede</option>
                  <option v-for="(sede, i) in sedes" :key="i" :value="sede.id">
                    {{ sede.nombre }}
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
import DepartamentoService from '@/services/departamento.service';
import InputValidationMixin from '@/mixins/InputValidationMixin';
import { departamento } from '@/services/validation.service';
import { validationMixin } from 'vuelidate';
import { required, integer, maxLength } from 'vuelidate/lib/validators';
export default {
  mixins: [validationMixin, InputValidationMixin],
  data() {
    return {
      form: {
        nombre: '',
        departamento_id: 0,
        departamento: '',
      },
      sedes: [],
      errors: [],
    };
  },
  mounted() {
    DepartamentoService.index().then((res) => {
      this.sedes = res.data;
    });
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
      this.$v.form.$touch();
      if (this.invalid) return;

      this.$store
        .dispatch('depositos/create', this.form)
        .then(() => this.$emit('close'))
        .catch((e) => (this.errors = e.response.data.errors));
    },
    selectDepartamento(e) {
      this.form.departamento = e.target[e.target.options.selectedIndex].text;
    },
  },
};
</script>
