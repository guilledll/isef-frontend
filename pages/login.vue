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
        <!-- <input type="hidden" name="remember" value="true" /> -->
        <div class="space-y-2">
          <div>
            <FormInput
              id="ci"
              v-model.trim="form.ci"
              name="ci"
              autocomplete="on"
              placeholder="Correo o CI"
              :error="hasError($v.form.ci, 'ci')"
              @input="fieldReset($v.form.ci, 'ci')"
              @blur="$v.form.ci.$touch()"
            >
              <LazyFormError
                v-if="hasError($v.form.ci, 'ci')"
                :text="errorText($v.form.ci, 'ci')"
                :val="errorValidation($v.form.ci)"
              />
            </FormInput>
          </div>
          <div>
            <FormInput
              id="password"
              v-model.trim="form.password"
              name="password"
              type="password"
              autocomplete="current-password"
              placeholder="Contraseña"
              :error="hasError($v.form.password)"
              @input="fieldReset($v.form.password, 'ci')"
              @blur="$v.form.password.$touch()"
            >
              <LazyFormError
                v-if="hasError($v.form.password)"
                :text="errorText($v.form.password)"
              />
            </FormInput>
          </div>
        </div>
        <div v-if="false" class="flex items-center justify-between">
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
import InputValidationMixin from '@/mixins/InputValidationMixin';
import { validationMixin } from 'vuelidate';
import { required, maxLength } from 'vuelidate/lib/validators';

export default {
  mixins: [validationMixin, InputValidationMixin],
  layout: 'OutLayout',
  data() {
    return {
      form: {
        ci: '',
        password: '',
      },
    };
  },
  validations: {
    form: {
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
    login() {
      if (this.invalid) return;
      this.$auth.loginWith('laravelSanctum', { data: this.form }).catch((e) => {
        this.errors = e.response.data.errors;
      });
    },
  },
};
</script>
