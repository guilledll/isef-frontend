<template>
  <form @submit.prevent="createDeposito()">
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
            bg-red-100
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
            Agregar depósito
          </h3>
          <div>
            <Input
              id="nombre"
              v-model.trim="form.nombre"
              name="nombre"
              autocomplete="on"
              placeholder="nombre de deposito"
              :error="$v.form.nombre.$anyError"
              @input="$v.form.nombre.$reset()"
              @blur="$v.form.nombre.$touch()"
            />
            <span v-if="$v.form.nombre.$anyError" class="error">
              {{ validar($v.form.nombre) }}
            </span>
          </div>
          <div>
            <select
              id="departamento_id"
              v-model.trim="form.departamento_id"
              name="departamento_id"
              required
              class="input-text bg-white h-11 text-gray-900"
              :error="$v.form.departamento_id.$anyError"
              @input="$v.form.departamento_id.$reset()"
              @blur="$v.form.departamento_id.$touch()"
            >
              <option value="0">Seleccionar Sede</option>
              <option v-for="(sede, i) in sedes" :key="i" :value="sede.id">
                {{ sede.nombre }}
              </option>
            </select>
            <span v-if="$v.form.departamento_id.$anyError" class="error">
              {{ validar($v.form.departamento_id) }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <!-- DISABLE BUTTON IF NO CHANGES -->
    <ModalFooter text="Agregar depósito" @close="$emit('close')" />
  </form>
</template>

<script>
import DepartamentoService from '@/services/departamento.service'
import DepositosService from '@/services/depositos.service'

import { mensajes } from '@/services/validation.service'
import { validationMixin } from 'vuelidate'
import { validationMessage } from 'vuelidate-messages'
import { required, integer, maxLength } from 'vuelidate/lib/validators'
import Input from '@/components/forms/Input.vue'
import ModalFooter from '@/components/modals/ModalFooter.vue'
const departamento = (value) => value != 0
export default {
  components: {
    Input,
    ModalFooter,
  },
  mixins: [validationMixin],

  data() {
    return {
      form: {
        nombre: '',
        departamento_id: 0,
      },
      sedes: [],
      error: null,
    }
  },
  mounted() {
    DepartamentoService.index().then((res) => {
      this.sedes = res.data
    })
  },
  // PROBARLO SIN COPIAR EL MODELO !!!!!!!!
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
    validar: validationMessage(mensajes),
    // INCLUIR DEPOSITO SERVICE PARA HACER UPDATE DESDE ACA
    createDeposito() {
      this.$v.form.$touch()
      if (this.$v.$invalid) return
      DepositosService.create(this.form)
        .then((res) => {
          console.log(res)
        })
        .catch((e) => {
          console.log(e)
        })
    },
  },
}
</script>
