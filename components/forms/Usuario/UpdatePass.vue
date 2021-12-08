<template>
  <form @submit.prevent="updatePass">
    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <div class="sm:flex sm:items-start">
        <ModalLeftIcon />
        <div class="modal-form-body">
          <h3 class="modal-form-heading">Cambiar contraseña</h3>
          <p class="mb-3">Cambiar permisos del usuario.</p>
          <div v-if="true">
            <!-- UPDATE PASSWORD -->
            <div class="space-y-2 mt-2">
              <p class="font-1 mb-1 mt-3">Ingrese una nueva contraseña.</p>
              <!-- CONTRASEÑA -->
              <div>
                <FormInput
                  id="password"
                  v-model.trim="password"
                  name="password"
                  type="password"
                  placeholder="Contraseña"
                  :error="hasError($v.password)"
                  @input="fieldReset($v.password)"
                  @blur="touch($v.password)"
                >
                  <LazyFormError
                    v-if="hasError($v.password)"
                    :text="errorText($v.password)"
                  />
                </FormInput>
              </div>
              <!-- REPETIR CONTRASEÑA -->
              <p class="font-1 mb-1 mt-3">Repetir contraseña.</p>
              <div>
                <FormInput
                  id="password_confirmation"
                  v-model.trim="password_confirmation"
                  name="password_confirmation"
                  type="password"
                  placeholder="Repetir contraseña"
                  :error="hasError($v.password_confirmation)"
                  @input="fieldReset($v.password_confirmation)"
                  @blur="touch($v.password_confirmation)"
                >
                  <LazyFormError
                    v-if="hasError($v.password_confirmation)"
                    :text="errorText($v.password_confirmation)"
                  />
                </FormInput>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <ModalFooter
      text="Modificar rol"
      :disabled="disabled"
      @close="closeModal"
    />
  </form>
</template>

<script>
import FormValidationMixin from '@/mixins/FormValidationMixin';
import { validationMixin } from 'vuelidate';
import { updatedDiff } from 'deep-object-diff';
import {
  requiredIf,
  maxLength,
  minLength,
  sameAs,
} from 'vuelidate/lib/validators';
export default {
  mixins: [validationMixin, FormValidationMixin],
  props: {
    isView: { type: Boolean, default: false },
  },
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
      },
    };
  },
  computed: {
    usuario() {
      return this.$store.state.users.user;
    },
    disabled() {
      return (
        Object.keys(updatedDiff(this.usuario, this.form)).length == 0 ||
        this.$v.form.$invalid ||
        this.$v.password.$invalid ||
        this.$v.password_confirmation.$invalid
      );
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
  validations: {
    form: {
      password: {
        required: requiredIf((cambiar) => {
          return cambiar;
        }),
        minLength: minLength(8),
        maxLength: maxLength(50),
      },
      password_confirmation: {
        required: requiredIf((cambiar) => {
          return cambiar;
        }),
        sameAsPassword: sameAs('password'),
      },
    },
  },
  methods: {
    async updatePass() {
      if (this.invalid()) return;
      await this.$store
        .dispatch('users/update', this.form)
        .then(async () => {
          await this.$auth.fetchUser();
          this.$emit('close');
        })
        .catch((e) => (this.errors = e.response.data.errors));
    },
    closeModal() {
      if (!this.isView) this.$store.dispatch('users/clear');
      this.$emit('close');
    },
  },
};
</script>
