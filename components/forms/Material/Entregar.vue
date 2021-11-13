<template>
  <form @submit.prevent="entregarMaterial">
    <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
      <div class="sm:flex sm:items-start">
        <ModalLeftIcon />
        <div class="modal-form-body">
          <h3 class="modal-form-heading">Entregar material</h3>
          <p class="mb-3">Entregar material a un alumno.</p>
          <div class="space-y-2">
            <div class="mb-5 grid grid-cols-2 gap-3 text-left sm:gap-5">
              <GlobalInputData
                v-for="res in reserva"
                :key="res.key"
                :title="res.title"
                :value="datoReserva(res.key)"
                :color="res.color"
                :svg="res.svg"
              />
            </div>
            <div>
              {{ reserva }}
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
          </div>
        </div>
      </div>
    </div>
    <ModalFooter
      text="Entregar material"
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
    id: { type: Number, default: null },
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
        material: '',
      },
    };
  },
  computed: {
    reserva() {
      return this.$store.state.reservas.reserva;
    },
    disabled() {
      return Object.keys(updatedDiff(this.reserva, this.form)).length == 0;
    },
    materiales() {
      return this.$store.state.reservas.materialesDisponibles;
    },
  },
  mounted() {
    this.$store.dispatch('reservas/get', this.id);

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
    selectReserva(value) {
      this.form.reserva = value;
    },
    entregarReserva() {
      console.log(this.reserva);
      if (this.invalid()) return;
      this.$store
        .dispatch('reservas/updateEstado', this.form)
        .then(() => {
          if (this.isView) {
            this.$emit('close');
          } else {
            this.$emit('actualizado');
          }
        })
        .catch((e) => (this.errors = e.response.data.errors));
    },
    closeModal() {
      if (!this.isView) this.$store.dispatch('reservas/clear');
      this.$emit('close');
    },
  },
};
</script>
