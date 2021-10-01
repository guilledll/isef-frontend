<template>
  <form @submit.prevent="updateDeposito">
    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <div class="sm:flex sm:items-start">
        <ModalLeftIcon />
        <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <h3 class="text-lg leading-6 font-medium text-gray-900 mb-3">
            Modificar depósito
          </h3>
          <p v-if="error && error.nombre" class="text-red-500 font-medium mb-1">
            {{ error.nombre[0] }}
          </p>
          <div>
            <Input
              id="nombre"
              v-model.trim="deposito.nombre"
              name="nombre"
              autocomplete="on"
              placeholder="nombre de deposito"
              :error="$v.deposito.nombre.$anyError"
              @input="$v.deposito.nombre.$reset()"
              @blur="$v.deposito.nombre.$touch()"
            />
            <span v-if="$v.deposito.nombre.$anyError" class="error">
              {{ validar($v.deposito.nombre) }}
            </span>
          </div>
          <input type="hidden" name="id" :value="deposito.id" />
        </div>
      </div>
    </div>
    <ModalFooter
      text="Modificar depósito"
      :disabled="disabled"
      @close="$emit('close')"
    />
  </form>
</template>

<script>
import DepositosService from '@/services/depositos.service';
import { mensajes } from '@/services/validation.service';
import { validationMixin } from 'vuelidate';
import { validationMessage } from 'vuelidate-messages';
import { required, numeric, maxLength } from 'vuelidate/lib/validators';
import { updatedDiff } from 'deep-object-diff';
import Input from '@/components/forms/Input.vue';
import ModalFooter from '@/components/modals/ModalFooter.vue';
import ModalLeftIcon from '@/components/modals/ModalLeftIcon.vue';
export default {
  components: {
    Input,
    ModalFooter,
    ModalLeftIcon,
  },
  mixins: [validationMixin],
  props: {
    model: { type: Object, default: () => {} },
  },
  data() {
    return {
      error: null,
      deposito: {
        id: '',
        nombre: '',
        departamento_id: '',
      },
    };
  },
  computed: {
    disabled() {
      return Object.keys(updatedDiff(this.model, this.deposito)).length == 0;
    },
  },
  mounted() {
    // this.deposito = this.model
    this.deposito.id = this.model.id;
    this.deposito.nombre = this.model.nombre;
    this.deposito.departamento_id = this.model.departamento_id;
  },
  validations: {
    deposito: {
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
    validar: validationMessage(mensajes),
    updateDeposito() {
      if (this.$v.invalid) return;
      DepositosService.update(this.deposito.id, this.deposito)
        .then(() => {
          // IMPLEMENTAR ESTO EN LA STORE
          // let deposito = this.depositos.find((dep) => dep.id === data.id)
          // deposito.nombre = data.nombre
          this.$emit('close');
        })
        .catch((e) => {
          this.error = e.response.data.errors;
        });
    },
  },
};
</script>
