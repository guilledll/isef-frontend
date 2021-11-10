<template>
  <form @submit.prevent="entregarMaterial">
    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <div class="sm:flex sm:items-start">
        <ModalLeftIcon />
        <div class="modal-form-body">
          <h3 class="modal-form-heading">Entregar material</h3>
          <p class="mb-3">Entregar material a un alumno.</p>
          <div class="space-y-2">
            <div>
              <FormTextarea
                id="nota"
                v-model.trim="form.nota"
                name="nota"
                placeholder="Notas (opcional)"
                :required="false"
                :error="hasError($v.form.nota, 'nota')"
                @input="fieldReset($v.form.nota, 'nota')"
                @blur="touch($v.form.nota)"
              >
                <LazyFormError
                  v-if="hasError($v.form.nota, 'nota')"
                  :text="errorText($v.form.nota, 'nota')"
                />
              </FormTextarea>
            </div>
            <!--Cantidad -->
            <FormCounter :cant="form.cantidad" @cambio="updateCantidad" />
          </div>
        </div>
      </div>
    </div>
    <ModalFooter
      text="Modificar material"
      :disabled="disabled"
      @close="closeModal"
    />
  </form>
</template>

<script>
import FormValidationMixin from '@/mixins/FormValidationMixin';
import { validationMixin } from 'vuelidate';
import { required, integer, maxLength } from 'vuelidate/lib/validators';
import { updatedDiff } from 'deep-object-diff';
export default {
  mixins: [validationMixin, FormValidationMixin],
  props: {
    isView: { type: Boolean, default: false },
  },
  data() {
    return {
      form: {
        id: '',
        user: '',
        user_ci: '',
        deposito_id: '',
        deposito: '',
        categoria_id: '',
        guardia_ci: this.$auth.user.ci,
        nota: '',
      },
    };
  },
  computed: {
    reserva() {
      return this.$store.state.reservas.reserva;
    },
    disabled() {
      return (
        Object.keys(updatedDiff(this.material, this.form)).length == 0 ||
        this.form.nombre.length == 0
      );
    },
  },
  mounted() {
    this.form.id = this.material.id;
    this.form.nombre = this.material.nombre;
    this.form.deposito_id = this.material.deposito_id;
    this.form.cantidad = this.material.cantidad;
    this.form.nota = this.material.nota;
  },
  validations: {
    form: {
      id: {
        required,
        integer,
      },
      nombre: {
        required,
        maxLength: maxLength(50),
      },
      deposito_id: {
        required,
        integer,
      },
      categoria_id: {
        required,
        integer,
      },
      cantidad: {
        required,
        integer,
      },
      nota: {
        maxLength: maxLength(255),
      },
    },
  },
  methods: {
    selectDeposito(value) {
      this.form.deposito = value;
    },
    closeModal() {
      if (!this.isView) this.$store.dispatch('reservas/clear');
      this.$emit('close');
    },
  },
};
</script>
