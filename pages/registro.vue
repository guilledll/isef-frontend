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
      <form class="mt-8 space-y-4" @submit.prevent="registro">
        <div class="space-y-2">
          <!-- CEDULA -->
          <div>
            <FormInput
              id="ci"
              v-model.trim="form.ci"
              name="ci"
              placeholder="Cédula (sin puntos ni guión)"
              :error="hasError($v.form.ci, 'ci')"
              @input="fieldReset($v.form.ci, 'ci')"
              @blur="touch($v.form.ci)"
            >
              <LazyFormError
                v-if="hasError($v.form.ci, 'ci')"
                :text="errorText($v.form.ci, 'ci')"
                :val="errorValidation($v.form.ci)"
              />
            </FormInput>
          </div>
          <!-- NOMBRE -->
          <div>
            <FormInput
              id="nombre"
              v-model.trim="form.nombre"
              name="nombre"
              placeholder="Nombre"
              :error="hasError($v.form.nombre)"
              @input="fieldReset($v.form.nombre)"
              @blur="touch($v.form.nombre)"
            >
              <LazyFormError
                v-if="hasError($v.form.nombre)"
                :text="errorText($v.form.nombre)"
              />
            </FormInput>
          </div>
          <!-- APELLIDO -->
          <div>
            <FormInput
              id="apellido"
              v-model.trim="form.apellido"
              name="apellido"
              placeholder="Apellido"
              :error="hasError($v.form.apellido)"
              @input="fieldReset($v.form.apellido)"
              @blur="touch($v.form.apellido)"
            >
              <LazyFormError
                v-if="hasError($v.form.apellido)"
                :text="errorText($v.form.apellido)"
              />
            </FormInput>
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
              :error="hasError($v.form.correo, 'correo')"
              @input="fieldReset($v.form.correo, 'correo')"
              @blur="touch($v.form.correo)"
            >
              <LazyFormError
                v-if="hasError($v.form.correo, 'correo')"
                :text="errorText($v.form.correo, 'correo')"
                :val="errorValidation($v.form.correo)"
              />
            </FormInput>
          </div>
          <!-- TELEFONO -->
          <div>
            <FormInput
              id="telefono"
              v-model.trim="form.telefono"
              name="telefono"
              type="tel"
              placeholder="Teléfono de contacto"
              :error="hasError($v.form.telefono, 'telefono')"
              @input="fieldReset($v.form.telefono, 'telefono')"
              @blur="touch($v.form.telefono)"
            >
              <LazyFormError
                v-if="hasError($v.form.telefono, 'telefono')"
                :text="errorText($v.form.telefono, 'telefono')"
                :val="errorValidation($v.form.telefono)"
              />
            </FormInput>
          </div>
          <!-- CONTRASEÑA -->
          <div>
            <FormInput
              id="password"
              v-model.trim="form.password"
              name="password"
              type="password"
              placeholder="Contraseña"
              :error="hasError($v.form.password)"
              @input="fieldReset($v.form.password)"
              @blur="touch($v.form.password)"
            >
              <LazyFormError
                v-if="hasError($v.form.password)"
                :text="errorText($v.form.password)"
              />
            </FormInput>
          </div>
          <!-- REPETIR CONTRASEÑA -->
          <div>
            <FormInput
              id="password_confirmation"
              v-model.trim="form.password_confirmation"
              name="password_confirmation"
              type="password"
              placeholder="Repetir contraseña"
              :error="hasError($v.form.password_confirmation)"
              @input="fieldReset($v.form.password_confirmation)"
              @blur="touch($v.form.password_confirmation)"
            >
              <LazyFormError
                v-if="hasError($v.form.password_confirmation)"
                :text="errorText($v.form.password_confirmation)"
              />
            </FormInput>
          </div>
          <!-- SEDE -->
          <div>
            <FormSelect
              id="sede"
              v-model.trim="form.departamento"
              name="sede"
              required
              :error="hasError($v.form.departamento)"
              @input="fieldReset($v.form.departamento)"
              @blur="touch($v.form.departamento)"
            >
              <template #options>
                <option value="0">Sede a la que perteneces</option>
                <option
                  v-for="departamento in departamentos"
                  :key="departamento.id"
                  :value="departamento.id"
                >
                  {{ departamento.nombre }}
                </option>
              </template>
              <template #error>
                <LazyFormError
                  v-if="hasError($v.form.departamento)"
                  :text="errorText($v.form.departamento)"
                />
              </template>
            </FormSelect>
          </div>
        </div>
        <button class="btn full green" :disabled="!loading">
          <span v-if="!loading">Registrarme</span>
          <GlobalSvg v-else class="h-5 w-5 animate-spin" svg="refresh" />
        </button>
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
import FormValidationMixin from '@/mixins/FormValidationMixin';
import { departamento, cedula } from '@/services/validation.service';
import { validationMixin } from 'vuelidate';
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
  mixins: [validationMixin, FormValidationMixin],
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
    };
  },
  computed: {
    departamentos() {
      return this.$store.state.departamentos.departamentos.length
        ? this.$store.state.departamentos.departamentos
        : this.$store.dispatch('departamentos/getAll');
    },
    loading() {
      return this.$store.state.global.loading;
    },
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
        minLength: minLength(9),
        maxLength: maxLength(9),
        numeric,
      },
      password: {
        required,
        minLength: minLength(8),
        maxLength: maxLength(50),
      },
      password_confirmation: {
        required,
        sameAsPassword: sameAs('password'),
      },
      departamento: {
        required,
        integer,
        departamento,
      },
    },
  },
  methods: {
    registro() {
      if (this.invalid()) return;
      this.$store
        .dispatch('users/register', this.form)
        .then(() => {
          this.$store.dispatch('global/loading', false);
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
