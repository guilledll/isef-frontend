<template>
  <div
    class="flex flex-col items-center justify-center sm:py-12 sm:px-6 lg:px-8"
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
            class="text-red-500 font-medium text-center"
          >
            {{ e[0] }}
          </p>
        </div>
        <div class="space-y-2">
          <!-- CEDULA -->
          <div>
            <FormInput
              id="ci"
              v-model.trim="form.ci"
              name="ci"
              placeholder="Cédula (sin puntos ni guión)"
              :error="$v.form.ci.$anyError"
              @input="$v.form.ci.$reset()"
              @blur="$v.form.ci.$touch()"
            />
            <span v-if="$v.form.ci.$anyError" class="error">
              {{ validar($v.form.ci) }}
            </span>
          </div>
          <!-- NOMBRE -->
          <div>
            <FormInput
              id="nombre"
              v-model.trim="form.nombre"
              name="nombre"
              placeholder="Nombre"
              :error="$v.form.nombre.$anyError"
              @input="$v.form.nombre.$reset()"
              @blur="$v.form.nombre.$touch()"
            />
            <span v-if="$v.form.nombre.$anyError" class="error">
              {{ validar($v.form.nombre) }}
            </span>
          </div>
          <!-- APELLIDO -->
          <div>
            <FormInput
              id="apellido"
              v-model.trim="form.apellido"
              name="apellido"
              placeholder="Apellido"
              :error="$v.form.apellido.$anyError"
              @input="$v.form.apellido.$reset()"
              @blur="$v.form.apellido.$touch()"
            />
            <span v-if="$v.form.apellido.$anyError" class="error">
              {{ validar($v.form.apellido) }}
            </span>
          </div>
          <!-- CORREO -->
          <div>
            <FormInput
              id="correo"
              v-model.trim="form.correo"
              name="correo"
              type="email"
              autocomplete="email"
              placeholder="Correo"
              :error="$v.form.correo.$anyError"
              @input="$v.form.correo.$reset()"
              @blur="$v.form.correo.$touch()"
            />
            <span v-if="$v.form.correo.$anyError" class="error">
              {{ validar($v.form.correo) }}
            </span>
          </div>
          <!-- TELEFONO -->
          <div>
            <FormInput
              id="telefono"
              v-model.trim="form.telefono"
              name="telefono"
              type="tel"
              placeholder="Teléfono de contacto"
              :error="$v.form.telefono.$anyError"
              @input="$v.form.telefono.$reset()"
              @blur="$v.form.telefono.$touch()"
            />
            <span v-if="$v.form.telefono.$anyError" class="error">
              {{ validar($v.form.telefono) }}
            </span>
          </div>
          <!-- CONTRASEÑA -->
          <div>
            <FormInput
              id="password"
              v-model.trim="form.password"
              name="password"
              type="password"
              placeholder="Contraseña"
              :error="$v.form.password.$anyError"
              @input="$v.form.password.$reset()"
              @blur="$v.form.password.$touch()"
            />
            <span v-if="$v.form.password.$anyError" class="error">
              {{ validar($v.form.password) }}
            </span>
          </div>
          <!-- REPETIR CONTRASEÑA -->
          <div>
            <FormInput
              id="password_confirmation"
              v-model.trim="form.password_confirmation"
              name="password_confirmation"
              type="password"
              placeholder="Repetir contraseña"
              :error="$v.form.password_confirmation.$anyError"
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
              v-model.trim="form.departamento"
              name="sede"
              required
              class="input-text bg-white h-11 text-gray-900"
              :error="$v.form.departamento.$anyError"
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
        <button class="btn full green">Registrarme</button>
      </form>
    </div>
    <router-link
      to="/login"
      class="
        text-center
        font-medium
        text-green-600
        hover:text-green-500
        mt-6
        hover:underline
      "
    >
      ¿Ya tiene una cuenta? Inicia sesión!
    </router-link>
  </div>
</template>

<script>
import DepartamentoService from '@/services/departamentos.service';
import AuthService from '~/services/auth.service';
import { mensajes, departamento, cedula } from '@/services/validation.service';
import { validationMixin } from 'vuelidate';
import { validationMessage } from 'vuelidate-messages';
import {
  required,
  minLength,
  maxLength,
  numeric,
  integer,
  email,
  sameAs,
} from 'vuelidate/lib/validators';

export default {
  mixins: [validationMixin],
  layout: 'OutLayout',
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
    };
  },
  validations: {
    form: {
      ci: {
        required,
        minLength: minLength(8),
        maxLength: maxLength(8),
        numeric,
        cedula,
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
        numeric,
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
      this.sedes = res.data;
    });
  },
  methods: {
    validar: validationMessage(mensajes),
    registro() {
      if (this.$v.$invalid) return;
      AuthService.register(this.form)
        .then(() => {
          this.$auth.loginWith('laravelSanctum', {
            correo: this.form.correo,
            password: this.form.password,
          });
        })
        .catch((e) => {
          this.errors = e.response.data.errors;
        });
    },
  },
};
</script>
