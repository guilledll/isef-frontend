<template>
  <div
    class="
      min-h-screen
      flex flex-col
      items-center
      justify-center
      py-12
      px-4
      sm:px-6
      lg:px-8
    "
  >
    <div class="max-w-md w-full space-y-8">
      <div class="text-center space-y-2">
        <h2 class="text-4xl font-extrabold text-gray-900">ISEF</h2>
        <p class="text-gray-500 text-xl">
          Regístarte para reservar el uso de materiales en las sedes de ISEF.
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="registro">
        <div>
          <p
            v-for="(e, i) in errors"
            :key="i"
            class="mb-1 text-red-500 font-medium text-center"
          >
            {{ e[0] }}
          </p>
        </div>
        <div class="space-y-2">
          <!-- CEDULA -->
          <div>
            <input
              id="ci"
              v-model.trim="$v.form.ci.$model"
              name="ci"
              type="text"
              required
              pattern="[0-9]{8}"
              class="input-text"
              placeholder="Cédula (sin puntos ni guión)"
              :class="{ error: $v.form.ci.$anyError }"
              @input="$v.form.ci.$reset()"
              @blur="$v.form.ci.$touch()"
            />
            <span v-if="$v.form.ci.$anyError" class="error">
              {{ validar($v.form.ci) }}
            </span>
          </div>
          <!-- NOMBRE -->
          <div>
            <input
              id="nombre"
              v-model.trim="$v.form.nombre.$model"
              name="nombre"
              type="text"
              required
              class="input-text"
              placeholder="Nombre"
              :class="{ error: $v.form.nombre.$anyError }"
              @input="$v.form.nombre.$reset()"
              @blur="$v.form.nombre.$touch()"
            />
            <span v-if="$v.form.nombre.$anyError" class="error">
              {{ validar($v.form.nombre) }}
            </span>
          </div>
          <!-- APELLIDO -->
          <div>
            <input
              id="apellido"
              v-model.trim="$v.form.apellido.$model"
              name="apellido"
              type="text"
              required
              class="input-text"
              placeholder="Apellido"
              :class="{ error: $v.form.apellido.$anyError }"
              @input="$v.form.apellido.$reset()"
              @blur="$v.form.apellido.$touch()"
            />
            <span v-if="$v.form.apellido.$anyError" class="error">
              {{ validar($v.form.apellido) }}
            </span>
          </div>
          <!-- CORREO -->
          <div>
            <input
              id="correo"
              v-model.trim="$v.form.correo.$model"
              name="correo"
              type="email"
              autocomplete="email"
              required
              class="input-text"
              placeholder="Correo"
              :class="{ error: $v.form.correo.$anyError }"
              @input="$v.form.correo.$reset()"
              @blur="$v.form.correo.$touch()"
            />
            <span v-if="$v.form.correo.$anyError" class="error">
              {{ validar($v.form.correo) }}
            </span>
          </div>
          <!-- TELEFONO -->
          <div>
            <input
              id="telefono"
              v-model.trim="$v.form.telefono.$model"
              name="telefono"
              type="tel"
              pattern="[0-9]{9}"
              required
              class="input-text"
              placeholder="Teléfono de contacto"
              :class="{ error: $v.form.telefono.$anyError }"
              @input="$v.form.telefono.$reset()"
              @blur="$v.form.telefono.$touch()"
            />
            <span v-if="$v.form.telefono.$anyError" class="error">
              {{ validar($v.form.telefono) }}
            </span>
          </div>
          <!-- CONTRASEÑA -->
          <div>
            <input
              id="password"
              v-model.trim="$v.form.password.$model"
              name="password"
              type="password"
              required
              class="input-text"
              placeholder="Contraseña"
              :class="{ error: $v.form.password.$anyError }"
              @input="$v.form.password.$reset()"
              @blur="$v.form.password.$touch()"
            />
            <span v-if="$v.form.password.$anyError" class="error">
              {{ validar($v.form.password) }}
            </span>
          </div>
          <!-- REPETIR CONTRASEÑA -->
          <div>
            <input
              id="password_confirmation"
              v-model.trim="$v.form.password_confirmation.$model"
              name="password_confirmation"
              type="password"
              required
              class="input-text"
              placeholder="Repetir contraseña"
              :class="{ error: $v.form.password_confirmation.$anyError }"
              @input="$v.form.password_confirmation.$reset()"
              @blur="$v.form.password_confirmation.$touch()"
            />
            <span v-if="$v.form.password_confirmation.$anyError" class="error">
              {{ validar($v.form.password_confirmation) }}
            </span>
          </div>
          <!-- SEDE -->
          <div>
            <select
              id="sede"
              v-model.trim="$v.form.departamento.$model"
              name="sede"
              required
              class="input-text bg-white h-11 text-gray-900"
              :class="{ error: $v.form.departamento.$anyError }"
              @input="$v.form.departamento.$reset()"
              @blur="$v.form.departamento.$touch()"
            >
              <option value="0">Sede a la que perteneces</option>
              <option v-for="(sede, i) in sedes" :key="i" :value="sede.id">
                {{ sede.nombre }}
              </option>
            </select>
            <span v-if="$v.form.departamento.$anyError" class="error">
              {{ validar($v.form.departamento) }}
            </span>
          </div>
        </div>
        <button class="btn-indigo">Registrarme</button>
      </form>
    </div>
    <router-link
      to="/login"
      class="
        text-center
        font-medium
        text-indigo-600
        hover:text-indigo-500
        mt-6
        hover:underline
      "
    >
      ¿Ya tiene una cuenta? Inicia sesión!
    </router-link>
  </div>
</template>

<script>
import DepartamentoService from '@/services/departamento.service'
import AuthService from '~/services/auth.service'
import { mensajes } from '@/services/validation.service'
import { validationMixin } from 'vuelidate'
import { validationMessage } from 'vuelidate-messages'
import {
  required,
  minLength,
  maxLength,
  numeric,
  integer,
  email,
  sameAs,
} from 'vuelidate/lib/validators'
const departamento = (value) => value != 0
export default {
  mixins: [validationMixin],
  layout: 'App',
  middleware: 'guest',
  data() {
    return {
      form: {
        ci: '',
        nombre: '',
        apellido: '',
        correo: '',
        telefono: '',
        password: '',
        password_confirmation: '',
        departamento: 0,
      },
      sedes: {},
      errors: [],
    }
  },
  validations: {
    form: {
      ci: {
        required,
        minLength: minLength(8),
        maxLength: maxLength(8),
        numeric,
      },
      nombre: {
        required,
        maxLength: maxLength(50),
      },
      apellido: {
        required,
        maxLength: maxLength(50),
      },
      correo: {
        required,
        email,
        maxLength: maxLength(100),
      },
      telefono: {
        required,
        maxLength: maxLength(9),
      },
      password: {
        required,
        minLength: minLength(8),
        maxLength: maxLength(50),
      },
      password_confirmation: {
        sameAsPassword: sameAs('password'),
      },
      departamento: {
        required,
        integer,
        departamento,
      },
    },
  },
  mounted() {
    DepartamentoService.index().then((res) => {
      this.sedes = res.data
    })
  },
  methods: {
    validar: validationMessage(mensajes),
    clean_ci(ci) {
      return ci.replace(/\D/g, '')
    },
    validation_digit(ci) {
      var a = 0
      var i = 0
      if (ci.length <= 6) {
        for (i = ci.length; i < 7; i++) {
          ci = '0' + ci
        }
      }
      for (i = 0; i < 7; i++) {
        a += (parseInt('2987634'[i]) * parseInt(ci[i])) % 10
      }
      if (a % 10 === 0) {
        return 0
      } else {
        return 10 - (a % 10)
      }
    },
    validateCi(ci) {
      ci = this.clean_ci(ci)
      var dig = ci[ci.length - 1]
      ci = ci.replace(/[0-9]$/, '')
      return dig == this.validation_digit(ci)
    },
    registro() {
      if (this.$v.$invalid) return
      if (!this.validateCi(this.form.ci)) {
        this.errors = [['La cédula no es válida.']]
        return
      }
      AuthService.register(this.form)
        .then(() => {
          this.$auth.loginWith('laravelSanctum', {
            correo: this.form.correo,
            password: this.form.password,
          })
        })
        .catch((e) => {
          this.errors = e.response.data.errors
        })
    },
  },
}
</script>
