<template>
  <form @submit.prevent="updateDeposito()">
    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <div class="sm:flex sm:items-start">
        <!-- EXTRAER ICONO LATERAL -->
        <div
          class="
            mx-auto
            flex flex-shrink-0
            items-center
            justify-center
            h-12
            w-12
            rounded-full
            bg-blue-100
            sm:mx-0 sm:h-10 sm:w-10
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            />
          </svg>
        </div>
        <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <h3 class="text-lg leading-6 font-medium text-gray-900 mb-3">
            Modificar depósito
          </h3>
          <div>
            <Input
              id="nombre"
              v-model.trim="depositoModel.nombre"
              name="nombre"
              autocomplete="on"
              placeholder="nombre de deposito"
              :error="$v.depositoModel.nombre.$anyError"
              @input="$v.depositoModel.nombre.$reset()"
              @blur="$v.depositoModel.nombre.$touch()"
            />
            <span v-if="$v.depositoModel.nombre.$anyError" class="error">
              {{ validar($v.depositoModel.nombre) }}
            </span>
            <Input
              id="id"
              v-model.trim="depositoModel.id"
              name="id"
              type="hidden"
              :error="$v.depositoModel.id.$anyError"
              @input="$v.depositoModel.id.$reset()"
              @blur="$v.depositoModel.id.$touch()"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- DISABLE BUTTON IF NO CHANGES -->
    <ModalFooter text="Modificar depósito" @close="$emit('close')" />
  </form>
</template>

<script>
import { mensajes } from '@/services/validation.service'
import { validationMixin } from 'vuelidate'
import { validationMessage } from 'vuelidate-messages'
import { required, numeric, maxLength } from 'vuelidate/lib/validators'
import Input from '@/components/forms/Input.vue'
import ModalFooter from '@/components/modals/ModalFooter.vue'
export default {
  components: {
    Input,
    ModalFooter,
  },
  mixins: [validationMixin],
  props: {
    model: { type: Object, default: () => {} },
  },
  data() {
    return {
      error: null,
      depositoModel: {
        id: '',
        nombre: '',
        departamento_id: '',
      },
    }
  },
  mounted() {
    this.depositoModel.id = this.model.id
    this.depositoModel.nombre = this.model.nombre
    this.depositoModel.departamento_id = this.model.departamento_id
  },
  // PROBARLO SIN COPIAR EL MODELO !!!!!!!!
  validations: {
    depositoModel: {
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
    // INCLUIR DEPOSITO SERVICE PARA HACER UPDATE DESDE ACA
    updateDeposito() {
      if (this.$v.$invalid) return
      this.$emit('update', this.depositoModel)
    },
  },
}
</script>
