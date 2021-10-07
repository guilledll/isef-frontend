<template>
  <form @submit.prevent="createDepartamento">
    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <div class="sm:flex sm:items-start">
        <ModalLeftIcon type="add" />
        <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <h3 class="text-xl leading-6 font-medium text-gray-900 mb-3">
            Agregar departamento
          </h3>
          <p class="mb-3">Se creará un nuevo departamento.</p>
          <p v-if="error" class="text-red-500 font-medium mb-1">
            {{ error.nombre[0] }}
          </p>
          <div class="space-y-2">
            <div>
              <FormInput
                id="nombre"
                v-model.trim="departamento.nombre"
                name="nombre"
                autocomplete="on"
                placeholder="Nombre de departamento"
                :error="$v.departamento.nombre.$anyError"
                @input="$v.departamento.nombre.$reset()"
                @blur="$v.departamento.nombre.$touch()"
              />
              <span v-if="$v.departamento.nombre.$anyError" class="error">
                {{ validar($v.departamento.nombre) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ModalFooter text="Nuevo departamento" type="add" @close="$emit('close')" />
  </form>
</template>

<script>
import departamentoService from '@/services/departamento.service';
import { mensajes } from '@/services/validation.service';
import { validationMixin } from 'vuelidate';
import { validationMessage } from 'vuelidate-messages';
import { required, maxLength } from 'vuelidate/lib/validators';
export default {
  mixins: [validationMixin],
  data() {
    return {
      departamento: {
        nombre: '',
      },
      sedes: [],
      error: null,
    };
  },
  mounted() {
    departamentoService.index().then((res) => {
      this.sedes = res.data;
    });
  },
  validations: {
    departamento: {
      nombre: {
        required,
        maxLength: maxLength(50),
      },
    },
  },
  methods: {
    validar: validationMessage(mensajes),
    createDepartamento() {
      this.$v.departamento.$touch();
      if (this.$v.$invalid) return;
      departamentoService
        .create(this.departamento)
        .then(() => {
          // ALMACENAR EN STORE
          this.$router.go();
        })
        .catch((e) => {
          this.error = e.response.data.errors;
        });
    },
  },
};
</script>
