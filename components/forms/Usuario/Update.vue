<template>
  <form @submit.prevent="updateUsuario">
    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <div class="sm:flex sm:items-start">
        <ModalLeftIcon />
        <div class="modal-form-body">
          <h3 class="modal-form-heading">Actualizar datos personales</h3>
          <p class="mb-3">¡Mantén tu información actualizada!.</p>
          <!-- NOMBRE -->
          <div>
            <FormInput
              id="nombre"
              v-model.trim="form.nombre"
              name="nombre"
              autocomplete="on"
              placeholder="Nombre"
              :error="hasError($v.form.nombre, 'nombre')"
              @input="fieldReset($v.form.nombre, 'nombre')"
              @blur="touch($v.form.nombre)"
            >
              <LazyFormError
                v-if="hasError($v.form.nombre, 'nombre')"
                :text="errorText($v.form.nombre, 'nombre')"
                :val="errorValidation($v.form.nombre)"
              />
            </FormInput>
          </div>
          <!-- APELLIDO -->
          <div>
            <FormInput
              id="apellido"
              v-model.trim="form.apellido"
              name="apellido"
              autocomplete="on"
              placeholder="Apellido"
              :error="hasError($v.form.apellido, 'apellido')"
              @input="fieldReset($v.form.apellido, 'apellido')"
              @blur="touch($v.form.apellido)"
            >
              <LazyFormError
                v-if="hasError($v.form.apellido, 'apellido')"
                :text="errorText($v.form.apellido, 'apellido')"
                :val="errorValidation($v.form.apellido)"
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
          <!-- DEPARTAMENTO -->
          <div>
            <FormSelect
              id="departamento_id"
              v-model.trim="form.departamento_id"
              name="departamento_id"
              required
              :error="hasError($v.form.departamento_id)"
              @input="fieldReset($v.form.departamento_id)"
              @blur="touch($v.form.departamento_id)"
              @change="selectDepartamento"
            >
              <template #options>
                <option value="0">{{ form.departamento }}</option>
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
                  v-if="hasError($v.form.departamento_id)"
                  :text="errorText($v.form.departamento_id)"
                />
              </template>
            </FormSelect>
          </div>
          <!-- UPDATE PASSWORD -->
          <p class="font-1 mb-2 text-lg">¿Cambiar contraseña?</p>
          <div>
            <div class="checkbox">
              <input
                id="cambiar"
                v-model="form.cambiar"
                name="cambiar"
                type="checkbox"
                class="check"
                @change="$v.form.$reset()"
              />
              <label for="cambiar" class="text"> SI </label>
            </div>
          </div>
          <div v-if="form.cambiar" class="space-y-2 mt-2">
            <p class="font-1 mb-1 mt-3">Ingrese una nueva contraseña.</p>
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
            <p class="font-1 mb-1 mt-3">Repetir contraseña.</p>
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
          </div>
        </div>
      </div>
    </div>
    <ModalFooter
      text="Modificar datos"
      :disabled="disabled"
      @close="closeModal"
    />
  </form>
</template>
<script>
import { departamento } from '@/services/validation.service';
import { updatedDiff } from 'deep-object-diff';
import {
  required,
  integer,
  numeric,
  email,
  maxLength,
  minLength,
  sameAs,
} from 'vuelidate/lib/validators';
import { validationMixin } from 'vuelidate';
import FormValidationMixin from '@/mixins/FormValidationMixin';
export default {
  mixins: [validationMixin, FormValidationMixin],
  data() {
    return {
      form: {
        ci: '',
        nombre: '',
        apellido: '',
        departamento_id: '',
        correo: '',
        telefono: '',
        departamento: '',
        password: '',
        password_confirmation: '',
        cambiar: false,
      },
    };
  },
  computed: {
    usuario() {
      return this.$auth.user;
    },
    departamentos() {
      return this.$store.state.departamentos.departamentos.length
        ? this.$store.state.departamentos.departamentos
        : this.$store.dispatch('departamentos/all');
    },
    disabled() {
      return (
        Object.keys(updatedDiff(this.usuario, this.form)).length == 0 ||
        this.form.nombre.length == 0 ||
        this.form.apellido.length == 0
      );
    },
  },
  validations: {
    form: {
      ci: {
        required,
        integer,
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
      departamento_id: {
        required,
        integer,
        departamento,
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
    },
  },
  mounted() {
    this.form.ci = this.usuario.ci;
    this.form.nombre = this.usuario.nombre;
    this.form.apellido = this.usuario.apellido;
    this.form.telefono = this.usuario.telefono;
    this.form.departamento_id = this.usuario.departamento_id;
    this.form.correo = this.usuario.correo;
    this.form.departamento = this.usuario.departamento;
  },
  methods: {
    async updateUsuario() {
      console.log(this.form);
      if (this.invalid()) return;
      await this.$store
        .dispatch('users/update', this.form)
        .then(async () => {
          await this.$auth.fetchUser();
          this.$emit('close');
        })
        .catch((e) => (this.errors = e.response.data.errors));
    },
    selectDepartamento(value) {
      this.form.departamento = value;
    },
    closeModal() {
      if (!this.isView) this.$store.dispatch('users/clear');
      this.$emit('close');
    },
  },
};
</script>
