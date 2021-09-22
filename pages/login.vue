<template>
  <div
    class="flex flex-col items-center justify-center sm:py-12 sm:px-6 lg:px-8"
  >
    <div class="max-w-md w-full space-y-8">
      <div class="text-center space-y-2">
        <h2 class="text-4xl font-extrabold text-gray-900">ISEF</h2>
        <p class="text-gray-500 text-xl">Gestión de materiales y reservas</p>
      </div>
      <form class="mt-8 space-y-4" @submit.prevent="login">
        <input type="hidden" name="remember" value="true" />
        <div class="space-y-2">
          <p v-if="error" class="text-center text-red-500 font-medium">
            {{ error }}
          </p>
          <div>
            <Input
              id="ci"
              v-model.trim="user.ci"
              name="ci"
              autocomplete="on"
              placeholder="Correo o CI"
              :error="$v.user.ci.$anyError"
              @input="$v.user.ci.$reset()"
              @blur="$v.user.ci.$touch()"
            />
            <span v-if="$v.user.ci.$anyError || error" class="error">
              {{ validar($v.user.ci) }}
            </span>
          </div>
          <div>
            <Input
              id="password"
              v-model.trim="user.password"
              name="password"
              type="password"
              autocomplete="current-password"
              placeholder="Contraseña"
              :error="$v.user.password.$anyError"
              @input="$v.user.password.$reset()"
              @blur="$v.user.password.$touch()"
            />
            <span v-if="$v.user.password.$anyError" class="error">
              {{ validar($v.user.password) }}
            </span>
          </div>
        </div>
        <div class="flex items-center justify-between">
          <div class="checkbox">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              class="check"
            />
            <label for="remember-me" class="text"> Recuerdame </label>
          </div>
          <div class="text-sm">
            <a
              href="#"
              class="
                text-base
                font-medium
                text-indigo-600
                hover:text-indigo-500
              "
            >
              Recuperar contraseña
            </a>
          </div>
        </div>
        <button class="btn full indigo">Iniciar sesión</button>
      </form>
    </div>
    <router-link
      to="/registro"
      class="
        text-center
        font-medium
        text-indigo-600
        hover:text-indigo-500
        mt-6
        hover:underline
      "
    >
      ¿No tiene cuenta? Regístrate!
    </router-link>
  </div>
</template>

<script>
import { mensajes } from '@/services/validation.service'
import { validationMixin } from 'vuelidate'
import { validationMessage } from 'vuelidate-messages'
import { required, maxLength } from 'vuelidate/lib/validators'
import Input from '@/components/forms/Input'
export default {
  components: {
    Input,
  },
  mixins: [validationMixin],
  layout: 'App',
  middleware: 'guest',
  data() {
    return {
      user: {
        ci: '',
        password: '',
      },
      error: null,
    }
  },
  validations: {
    user: {
      ci: {
        required,
        maxLength: maxLength(255),
      },
      password: {
        required,
      },
    },
  },
  methods: {
    validar: validationMessage(mensajes),
    login() {
      if (this.$v.$invalid) return
      this.$auth.loginWith('laravelSanctum', { data: this.user }).catch((e) => {
        this.error = e.response.data.errors.ci[0]
      })
    },
  },
}
</script>
