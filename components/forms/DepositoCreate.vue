<template>
  <form @submit.prevent="createDeposito">
    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <div class="sm:flex sm:items-start">
        <ModalLeftIcon type="add" />
        <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <h3 class="text-xl leading-6 font-medium text-gray-900 mb-3">
            Agregar depósito
          </h3>
          <p class="mb-3">Se creará un nuevo depósitos para los materiales.</p>
          <p v-if="error" class="text-red-500 font-medium mb-1">
            {{ error.nombre[0] }}
          </p>
          <div class="space-y-2">
            <div>
              <FormInput
                id="nombre"
                v-model.trim="deposito.nombre"
                name="nombre"
                autocomplete="on"
                placeholder="Nombre de deposito"
                :error="$v.deposito.nombre.$anyError"
                @input="$v.deposito.nombre.$reset()"
                @blur="$v.deposito.nombre.$touch()"
              />
              <span v-if="$v.deposito.nombre.$anyError" class="error">
                {{ validar($v.deposito.nombre) }}
              </span>
            </div>
            <div>
              <select
                id="departamento_id"
                v-model.trim="deposito.departamento_id"
                name="departamento_id"
                required
                class="input-text bg-white h-11 text-gray-900"
                :error="$v.deposito.departamento_id.$anyError"
                @input="$v.deposito.departamento_id.$reset()"
                @blur="$v.deposito.departamento_id.$touch()"
                @change="selectDepartamento"
              >
                <option value="0">Seleccionar sede</option>
                <option v-for="(sede, i) in sedes" :key="i" :value="sede.id">
                  {{ sede.nombre }}
                </option>
              </select>
              <span v-if="$v.deposito.departamento_id.$anyError" class="error">
                {{ validar($v.deposito.departamento_id) }}
              </span>
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
import { mensajes } from '@/services/validation.service';
import { validationMixin } from 'vuelidate';
import { validationMessage } from 'vuelidate-messages';
import { required, integer, maxLength } from 'vuelidate/lib/validators';
const departamento = (value) => value != 0;
export default {
  mixins: [validationMixin],
  data() {
    return {
      deposito: {
        nombre: '',
        departamento_id: 0,
        departamento: '',
      },
      sedes: [],
      error: null,
    };
  },
  mounted() {
    DepartamentoService.index().then((res) => {
      this.sedes = res.data;
    });
  },
  validations: {
    deposito: {
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
    validar: validationMessage(mensajes),
    createDeposito() {
      this.$v.deposito.$touch();
      if (this.$v.$invalid) return;
      this.$store
        .dispatch('depositos/create', this.deposito)
        .then(() => {
          this.$emit('close');
        })
        .catch((e) => {
          this.error = e.response.data.errors;
        });
    },
    selectDepartamento(e) {
      this.deposito.departamento =
        e.target[e.target.options.selectedIndex].text;
    },
  },
};
</script>
