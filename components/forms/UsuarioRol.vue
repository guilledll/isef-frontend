<template>
  <form @submit.prevent="rolUsuario">
    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <div class="sm:flex sm:items-start">
        <ModalLeftIcon type="add" />
        <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <h3 class="text-xl leading-6 font-medium text-gray-900 mb-3">
            Asignar rol
          </h3>
          <p class="mb-3">Se asignará un rol al usuario.</p>
          <p v-if="error" class="text-red-500 font-medium mb-1">
            {{ error.ci[0] }}
          </p>
          <div class="space-y-2">
            <span class="font-medium text-gray-900">
              {{ model.nombre }}
            </span>
            <div>
              <select
                id="rol"
                v-model.trim="usuario.rol"
                name="rol"
                required
                class="input-text bg-white h-11 text-gray-900"
                :error="$v.usuario.rol.$anyError"
                @input="$v.usuario.rol.$reset()"
                @blur="$v.usuario.rol.$touch()"
              >
                <option value="0">Sin asignar</option>
                <option value="1">Usuario</option>
                <option value="2">Guardia</option>
                <option value="3">Administrador</option>
              </select>
              <span v-if="$v.usuario.rol.$anyError" class="error">
                {{ validar($v.usuario.rol) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ModalFooter text="Guardar rol" type="add" @close="$emit('close')" />
  </form>
</template>

<script>
import usuarioService from '@/services/user.service';
import { mensajes } from '@/services/validation.service';
import { validationMixin } from 'vuelidate';
import { validationMessage } from 'vuelidate-messages';
import { required, integer, maxLength } from 'vuelidate/lib/validators';

export default {
  mixins: [validationMixin],
  props: {
    model: { type: Object, default: () => {} },
  },
  data() {
    return {
      usuario: {
        ci: '',
        rol: '',
      },
      error: null,
    };
  },
  computed: {
    //  disabled() {
    // return Object.keys(updatedDiff(this.model, this.usuario)).length == 0;
    //},
  },
  mounted() {
    this.usuario.ci = this.model.ci;
    this.usuario.rol = this.model.rol;
  },
  validations: {
    usuario: {
      ci: {
        required,
        maxLength: maxLength(50),
      },
      rol: {
        required,
        integer,
      },
    },
  },
  methods: {
    validar: validationMessage(mensajes),
    updateDeposito() {
      if (this.$v.invalid) return;
      usuarioService
        .updateRol(this.usuario.ci, this.usuario)
        .then(() => {
          // IMPLEMENTAR ESTO EN LA STORE
          // let deposito = this.depositos.find((dep) => dep.id === data.id)
          // deposito.ci = data.ci
          this.$emit('close');
        })
        .catch((e) => {
          this.error = e.response.data.errors;
        });
    },
  },
};
</script>
