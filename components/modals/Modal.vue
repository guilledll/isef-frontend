<template>
  <transition
    enter-active-class="ease-out duration-300"
    enter-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="ease-in duration-200"
    leave-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div v-if="showModal" class="fixed z-10 inset-0 overflow-y-auto">
      <div
        class="
          flex
          items-end
          justify-center
          min-h-screen
          p-4
          text-center
          sm:block sm:p-0
        "
      >
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
          >&#8203;</span
        >
        <transition
          enter-active-class="transition ease-out duration-300"
          enter-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          enter-to-class="opacity-100 translate-y-0 sm:scale-100"
          leave-active-class="transition ease-in duration-200"
          leave-class="opacity-100 translate-y-0 sm:scale-100"
          leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <div
            v-if="showModal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-headline-1"
            class="
              inline-block
              align-bottom
              bg-white
              rounded-lg
              text-left
              overflow-hidden
              shadow-xl
              transform
              transition-all
              my-auto
              sm:align-middle sm:max-w-lg sm:w-full
              md:mx-auto
            "
          >
            <!-- FORMULARIO -->
            <form @submit.prevent="updateDeposito()">
              <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div class="sm:flex sm:items-start">
                  <div
                    class="
                      mx-auto
                      flex-shrink-0 flex
                      items-center
                      justify-center
                      h-12
                      w-12
                      rounded-full
                      bg-red-100
                      sm:mx-0 sm:h-10 sm:w-10
                    "
                  ></div>
                  <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      id="modal-headline-1"
                      class="text-lg leading-6 font-medium text-gray-900"
                    >
                      Modificar depósito
                    </h3>
                    <div class="my-3">
                      <p class="text-sm text-gray-600"></p>
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
                      <span
                        v-if="$v.depositoModel.nombre.$anyError"
                        class="error"
                      >
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
              <!-- BOTONES -->
              <div
                class="bg-red-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse"
              >
                <button
                  type="submit"
                  class="
                    btn-block
                    inline-flex
                    justify-center
                    border border-transparent
                    shadow-sm
                    px-4
                    py-2
                    bg-red-600
                    hover:bg-red-700
                    text-sm
                    font-medium
                    text-white
                    sm:ml-3
                    mt-0
                    sm:w-auto
                  "
                >
                  Modificar depósito
                </button>
                <button
                  type="button"
                  class="
                    btn-block
                    inline-flex
                    justify-center
                    border border-gray-300
                    shadow-sm
                    px-4
                    py-2
                    bg-white
                    text-sm
                    font-medium
                    text-gray-700
                    hover:bg-gray-50
                    mt-3
                    sm:mt-0 sm:ml-3 sm:w-auto
                  "
                  @click="$emit('close')"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </transition>
      </div>
    </div>
  </transition>
</template>

<script>
import { mensajes } from '@/services/validation.service'
import { validationMixin } from 'vuelidate'
import { validationMessage } from 'vuelidate-messages'
import { required, numeric, maxLength } from 'vuelidate/lib/validators'
//import DepositosService from '@/services/depositos.service'
import Input from '@/components/forms/Input'

export default {
  components: {
    Input,
  },
  mixins: [validationMixin],
  props: {
    showModal: { type: Boolean, default: false },
    deposito: { type: Object, default: () => {} },
  },
  data() {
    return {
      error: null,
      depositoModel: { id: '', nombre: '', departamento_id: '' },
    }
  },
  mounted() {
    this.depositoModel.id = this.deposito.id
    this.depositoModel.nombre = this.deposito.nombre
    this.depositoModel.departamento_id = this.deposito.departamento_id
  },
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
    updateDeposito() {
      if (this.$v.$invalid) return
      this.$emit('update', this.depositoModel)
      console.log(this.depositoModel)
    },
  },
}
</script>
