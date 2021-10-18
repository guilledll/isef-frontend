<template>
  <form @submit.prevent="updateRol">
    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <div class="sm:flex sm:items-start">
        <ModalLeftIcon />
        <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <h3 class="modal-form-heading">Modificar rol</h3>
          <select
            id="rol"
            v-model.trim="form.rol"
            name="rol"
            required
            class="input-text bg-white h-11 text-gray-900"
            :error="$v.form.rol.$anyError"
            @input="$v.form.rol.$reset()"
            @blur="$v.form.rol.$touch()"
          >
            <option value="0">Sin asignar</option>
            <option value="1">Usuario</option>
            <option value="2">Guardia</option>
            <option value="3">Administrador</option>
          </select>
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
import InputValidationMixin from '@/mixins/InputValidationMixin';
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
import { updatedDiff } from 'deep-object-diff';
export default {
  mixins: [validationMixin, InputValidationMixin],
  data() {
    return {
      form: {
        ci: '',
        rol: '',
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
        this.form.rol.length == 0
      );
    },
  },
  mounted() {
    this.form.ci = this.usuario.ci;
    this.form.rol = this.usuario.rol;
  },
  validations: {
    form: {
      rol: {
        required,
      },
    },
  },
  methods: {
    updateRol() {
      if (this.invalid()) return;
      this.$store
        .dispatch('users/updateRol', this.form)
        .then(() => this.$emit('close'))
        .catch((e) => (this.errors = e.response.data.errors));
    },
    closeModal() {
      this.$store.dispatch('users/clear');
      this.$emit('close');
    },
  },
};
</script>
